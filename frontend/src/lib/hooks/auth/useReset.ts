import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AppPathPublic, BACKEND_URL, PASSWORDREGEX } from '@/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';

const resetSchema = z
  .object({
    password: z
      .string()
      .regex(
        PASSWORDREGEX,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      )
      .min(8, 'Password should contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type resetInputs = z.infer<typeof resetSchema>;

export type resetPayload = {
  newPassword: string;
  token: string;
};
export type requestPayload = {
  email: string;
};

export default function useReset() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const isTokenMissing = !token;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<resetInputs>({
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
  });

  const mutationReset = useMutation({
    mutationFn: async (verData: resetPayload) => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(verData),
        });

        // Network worked, but backend returned error
        const data = await res.json();
        if (!res.ok) {
          throw data;
        }

        return data;
      } catch (err: any) {
        // Network error or backend down
        throw {
          message: err.message || 'Cannot connect to the server. Please try again later.',
        };
      }
    },
    onSuccess: () => {
      reset();
      toaster.create({
        title: 'The password has been updated.',
        description: 'You will now be redirected to the login page',
        type: 'success',
        duration: 5000,
      });

      setTimeout(() => {
        router.push(AppPathPublic.Login);
      }, 3000);
    },

    onError: (error: any) => {
      if (error?.message) {
        setError('root', {
          message: error.message,
        });
      }
    },
  });

  const onSubmit = async (data: resetInputs) => {
    if (isTokenMissing) {
      setError('root', {
        message: 'Reset token is missing or invalid.',
      });
      return;
    }

    mutationReset.mutate({
      newPassword: data.password,
      token: token!,
    });
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    mutationReset,
  };
}
