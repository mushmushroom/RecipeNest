'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { BACKEND_URL } from '@/lib/constants';
import { useFetchAuth } from '../useFetchAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useProfileData } from '../useProfileQuery';

const changeUsernameSchema = z.object({
  username: z.string().min(3, 'Username should contain at least 3 characters'),
});

type ChangeUsernameInputs = z.infer<typeof changeUsernameSchema>;

export default function useSettings() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangeUsernameInputs>({
    resolver: zodResolver(changeUsernameSchema),
    mode: 'onChange',
  });

  const { token } = useFetchAuth(true);
  const { data } = useProfileData();

  async function changeUsername({ username }: ChangeUsernameInputs) {
    if (username === data?.username) {
      toaster.create({
        title: 'No changes',
        description: 'This is already your current username',
        type: 'warning',
      });
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        const data = await response.json();
        toaster.create({
          title: 'Error',
          description: data.message || 'Something went wrong. Try again later.',
          type: 'error',
        });
        return;
      }
      reset();
      toaster.create({
        title: 'Success',
        description: 'Username was updated successfully',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['profileData'] });
    } catch (error) {
      console.log((error as Error).message);
      toaster.create({
        title: 'Error',
        description: 'Something went wrong. Try again later.',
        type: 'error',
      });
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    changeUsername,
  };
}
