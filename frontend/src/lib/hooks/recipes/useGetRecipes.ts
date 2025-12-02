import { getRecipeItem } from '@/lib/helpers/server-utils';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';
import { RecipeShort } from '@/lib/types/recipe';


export function useMyRecipes() {
  const { token } = useAuth(true);
  return useQuery({
    queryKey: ['my-recipes'],
    queryFn: () => getRecipeItem<RecipeShort[]>('my', token),
  });
}

export function useFavoriteRecipes() {}
