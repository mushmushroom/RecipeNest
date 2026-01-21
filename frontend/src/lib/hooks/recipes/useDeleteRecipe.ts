import { deleteRecipe } from '@/lib/helpers/server-utils';
import { useFetchAuth } from '../useFetchAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';

export default function useDeleteRecipe() {
  const { token } = useFetchAuth(true);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (recipeId: number) => {
      if (!token) throw new Error('Not authenticated');
      return deleteRecipe(recipeId, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-recipes'] });
      toaster.create({
        title: 'Success!',
        description: 'Recipe was removed successfully.',
        type: 'success',
        duration: 5000,
      });
    },
  });

  return {
    deleteRecipe: mutation.mutate,
    isDeleting: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
