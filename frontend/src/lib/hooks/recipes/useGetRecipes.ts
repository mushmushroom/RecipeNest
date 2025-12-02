import { getRecipeItem } from '@/lib/helpers/server-utils';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';
import { RecipeShort } from '@/lib/types/recipe';

export function useMyRecipes() {
  const { token } = useAuth(true);
  return useQuery({
    queryKey: ['my-recipes'],
    queryFn: () => getRecipeItem<RecipeShort[]>('my', token),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30,
  });
}

export function useFavoriteRecipes() {}
