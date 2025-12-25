'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { BACKEND_URL, PASSWORDREGEX } from '@/lib/constants';
import { useAuth } from '../useAuth';

const changeEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ChangeEmailInputs = z.infer<typeof changeEmailSchema>;

export default function useSettings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailInputs>({
    resolver: zodResolver(changeEmailSchema),
    mode: 'onChange',
  });

  const { token, currentEmail } = useAuth(true);

  async function changeEmail({ email }: ChangeEmailInputs) {
    if (email === currentEmail) {
      toaster.create({
        title: 'No changes',
        description: 'This is already your current email',
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

        body: JSON.stringify({ email }),
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
        description: 'Email was updated successfully',
        type: 'success',
      });
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
    changeEmail,
  };
}
