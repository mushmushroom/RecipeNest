import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, getUserFavorites, removeFavorite } from '../helpers/server-utils';
import { FavoriteRecipesResponse, RecipeShort } from '../types/recipe';

export default function useFavorites(token?: string) {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<FavoriteRecipesResponse>({
    queryKey: ['favorites', token],
    queryFn: () => getUserFavorites(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const favorites = favoritesQuery.data?.data ?? [];
  const favoriteIds = favorites.map((r) => r.id);

  const toggleMutation = useMutation({
    mutationFn: async (recipeId: number) => {
      if (!token) return;

      const isFavorite = favoriteIds.includes(recipeId);

      if (isFavorite) {
        await removeFavorite(recipeId, token);
        return { recipeId, isFavorite: true };
      } else {
        await addFavorite(recipeId, token);
        return { recipeId, isFavorite: false };
      }
    },

    onMutate: async (recipeId) => {
      if (!token) return;

      await queryClient.cancelQueries({ queryKey: ['favorites', token] });

      const previous = queryClient.getQueryData<FavoriteRecipesResponse>(['favorites', token]);

      queryClient.setQueryData<FavoriteRecipesResponse>(['favorites', token], (old) => {
        if (!old) return old;

        const isFavorite = old.data.some((r) => r.id === recipeId);

        return {
          data: isFavorite
            ? old.data.filter((r) => r.id !== recipeId)
            : [...old.data, { id: recipeId } as RecipeShort],
        };
      });

      return { previous };
    },

    onError: (_err, _recipeId, context) => {
      if (context?.previous && token) {
        queryClient.setQueryData(['favorites', token], context.previous);
      }
    },

    onSettled: () => {
      if (token) {
        queryClient.invalidateQueries({ queryKey: ['favorites', token] });
      }
    },
  });

  return {
    favorites,
    isFavorite: (id: number) => favoriteIds.includes(id),
    toggleFavorite: (recipeId: number) => toggleMutation.mutate(recipeId),
    isLoading: favoritesQuery.isLoading,
    isToggling: toggleMutation.isPending,
    isError: favoritesQuery.isError,
  };
}
