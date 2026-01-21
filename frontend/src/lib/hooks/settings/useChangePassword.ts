'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { BACKEND_URL, PASSWORDREGEX } from '@/lib/constants';
import { useFetchAuth } from '../useFetchAuth';

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z
      .string()
      .regex(
        PASSWORDREGEX,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      )
      .min(8, 'Password should contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ChangePasswordInputs = z.infer<typeof changePasswordSchema>;

export default function useSettings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInputs>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const { token } = useFetchAuth(true);

  async function changePassword({ oldPassword, newPassword }: ChangePasswordInputs) {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ oldPassword, newPassword }),
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
        description: 'Password updated successfully',
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
    changePassword,
  };
}
