import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, getUserFavorites, removeFavorite } from '../helpers/server-utils';
import { FavoriteRecipesResponse, RecipeShort } from '../types/recipe';
import { useEffect, useMemo } from 'react';

export default function useFavorites(
  token?: string,
  currentPage: number = 1,
  pageSize: number = 10
) {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<FavoriteRecipesResponse>({
    queryKey: ['favorites', token, currentPage, pageSize],
    queryFn: () => getUserFavorites(token!, currentPage, pageSize),
    retry: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const favorites = favoritesQuery.data?.data ?? [];
  const favoritesPagination = favoritesQuery.data?.meta;

  const allFavoriteIds = useMemo(
    () =>
      queryClient
        .getQueriesData<FavoriteRecipesResponse>({ queryKey: ['favorites', token] })
        .map(([_, data]) => data?.data ?? [])
        .flat()
        .map((r) => r.id),
    [favoritesQuery.data, queryClient, token]
  );
  const toggleMutation = useMutation({
    mutationFn: async (recipeId: number) => {
      if (!token) return;

      const isFavorite = allFavoriteIds.includes(recipeId);

      if (isFavorite) {
        await removeFavorite(recipeId, token);
        return { recipeId, isFavorite: true };
      } else {
        await addFavorite(recipeId, token);
        return { recipeId, isFavorite: false };
      }
    },

    onMutate: async () => {
      if (!token) return;
      await queryClient.cancelQueries({ queryKey: ['favorites', token, currentPage, pageSize] });
    },

    onSettled: () => {
      if (token) {
        queryClient.invalidateQueries({ queryKey: ['favorites', token], exact: false });
      }
    },
  });

  return {
    favorites,
    favoritesPagination,
    isFavorite: (id: number) => allFavoriteIds.includes(id),
    toggleFavorite: (recipeId: number) => toggleMutation.mutate(recipeId),
    isLoading: favoritesQuery.isLoading,
    isToggling: toggleMutation.isPending,
    isError: favoritesQuery.isError,
    refetch: favoritesQuery.refetch,
  };
}
