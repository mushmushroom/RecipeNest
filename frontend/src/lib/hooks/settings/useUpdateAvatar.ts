import { toaster } from '@/components/ui/toaster';
import { BACKEND_URL } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateAvatar(token: string, formData: FormData) {
  if (!token) throw new Error('No auth token provided');
  try {
    console.log('formData', JSON.stringify(Array.from(formData.entries())));
    const res = await fetch(`${BACKEND_URL}/user/me/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update avatar');
    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteAvatar(token: string) {
  if (!token) throw new Error('No auth token provided');
  try {
    const res = await fetch(`${BACKEND_URL}/user/me/avatar`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete avatar');
    return data;
  } catch (error) {
    throw error;
  }
}

export default function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const invalidateAvatarQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['profileData'] });
  };

  const deleteImage = useMutation({
    mutationFn: (token: string) => deleteAvatar(token),
    onSuccess: () => {
      invalidateAvatarQuery();
      toaster.create({
        title: 'Success!',
        description: 'Avatar was deleted successfully',
        type: 'success',
        duration: 5000,
      });
    },
    onError: (error) => console.error('Avatar update failed:', error),
  });

  const update = useMutation({
    mutationFn: ({ token, formData }: { token: string; formData: FormData }) =>
      updateAvatar(token, formData),
    onSuccess: () => {
      invalidateAvatarQuery();
      toaster.create({
        title: 'Success!',
        description: 'Avatar was updated successfully',
        type: 'success',
        duration: 5000,
      });
    },
    onError: (error) => console.error('Avatar update failed:', error),
  });

  return {
    updateAvatar: update.mutate,
    deleteAvatar: deleteImage.mutate,
    isLoading: update.isPending || deleteImage.isPending,
    isError: update.isError || deleteImage.isError,
    error: update.error || deleteImage.error,
  };
}
