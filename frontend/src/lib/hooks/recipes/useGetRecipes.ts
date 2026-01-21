import { getMyRecipes, getAllRecipesPage, getUserFavorites } from '@/lib/helpers/server-utils';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';
import {
  AllRecipesResponse,
  CategoryOption,
  FavoriteRecipesResponse,
  MyRecipesResponse,
} from '@/lib/types/recipe';
import useFilters from '../useFilters';

export function useMyRecipes(currentPage: number, pageSize: number = 10) {
  console.log('Fetching my recipes');
  const { token } = useAuth(true);
  return useQuery({
    queryKey: ['my-recipes', currentPage],
    queryFn: () => getMyRecipes<MyRecipesResponse>( token, currentPage, pageSize),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
}

interface UseAllRecipesProps {
  currentPage: number;
  categoriesOptions: CategoryOption[];
  pageSize?: number;
}

export function useAllRecipes({
  currentPage,
  pageSize = 10,
  categoriesOptions,
}: UseAllRecipesProps) {
  const { filters } = useFilters();
  const categoryIds = filters.category
    .map((name) => categoriesOptions.find((c) => c.name === name)?.id)
    .filter((id): id is number => !!id);

  const query: Record<string, any> = {
    page: currentPage,
    pageSize,
  };

  if (filters.search) query.search = filters.search;
  if (categoryIds.length > 0) query.category = categoryIds;
  if (filters.difficulty.length > 0) query.difficulty = filters.difficulty;
  if (filters.cookingTime.length > 0) query.cookingTime = filters.cookingTime;

  return useQuery({
    queryKey: ['all-recipes', currentPage, filters],
    queryFn: () => getAllRecipesPage<AllRecipesResponse>(query),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
