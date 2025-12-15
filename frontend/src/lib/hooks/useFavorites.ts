import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, getUserFavorites, removeFavorite } from '../helpers/server-utils';
import { RecipeFull } from '../types/recipe';

export default function useFavorites(token?: string) {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<RecipeFull[]>({
    queryKey: ['favorites', token],
    queryFn: () => getUserFavorites(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const favoritesIds = favoritesQuery.data?.map((recipe) => recipe.id) ?? [];

  const toggleMutation = useMutation({
    mutationFn: async ({ recipeId, isFavorite }: { recipeId: number; isFavorite: boolean }) => {
      if (!token) return;

      console.log('mutationFn - isFavorite:', isFavorite, 'recipeId:', recipeId);

      if (isFavorite) {
        console.log('removing from fav');
        await removeFavorite(recipeId, token);
        return { action: 'remove', recipeId };
      } else {
        console.log('adding to fav');
        await addFavorite(recipeId, token);
        return { action: 'add', recipeId };
      }
    },

    onMutate: async ({ recipeId, isFavorite }) => {
      if (!token) return;

      await queryClient.cancelQueries({ queryKey: ['favorites', token] });

      const previousFavorites = queryClient.getQueryData<RecipeFull[]>(['favorites', token]);

      queryClient.setQueryData<RecipeFull[]>(['favorites', token], (old = []) => {
        if (isFavorite) {
          return old.filter((r) => r.id !== recipeId);
        } else {
          return old;
        }
      });

      return { previousFavorites };
    },

    onError: (err, variables, context) => {
      console.error('Toggle favorite error:', err);
      if (context?.previousFavorites && token) {
        queryClient.setQueryData(['favorites', token], context.previousFavorites);
      }
    },

    onSettled: () => {
      if (token) {
        queryClient.invalidateQueries({ queryKey: ['favorites', token] });
      }
    },
  });

  const favorites = favoritesQuery.data ?? [];

  return {
    favorites,
    isFavorite: (id: number) => favoritesIds.includes(id),
    toggleFavorite: (recipeId: number) => {
      const isFavorite = favoritesIds.includes(recipeId);
      toggleMutation.mutate({ recipeId, isFavorite });
    },
    isLoading: favoritesQuery.isLoading,
    isToggling: toggleMutation.isPending,
    isError: favoritesQuery.isError,
  };
}
