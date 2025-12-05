import { getRecipeItemAuth, getRecipesPage } from '@/lib/helpers/server-utils';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';
import { AllRecipesResponse, MyRecipesResponse } from '@/lib/types/recipe';

export function useMyRecipes(currentPage: number, pageSize: number = 10) {
  console.log('Fetching recipes');
  const { token } = useAuth(true);
  return useQuery({
    queryKey: ['my-recipes', currentPage],
    queryFn: () => getRecipeItemAuth<MyRecipesResponse>('my', token, currentPage, pageSize),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useFavoriteRecipes() {}

export function useAllRecipes(currentPage: number, pageSize: number = 10) {
  return useQuery({
    queryKey: ['all-recipes', currentPage],
    queryFn: () => getRecipesPage<AllRecipesResponse>(currentPage, pageSize),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
