import { getRecipeItem } from '@/lib/helpers/server-utils';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';


export function useMyRecipes() {
  const { token } = useAuth(true);
  return useQuery({
    queryKey: ['my-recipes'],
    queryFn: () => getRecipeItem('my', token),
  });
}

export function useFavoriteRecipes() {}
