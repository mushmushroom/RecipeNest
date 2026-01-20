import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { BACKEND_URL } from '@/lib/constants';
import { toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';

const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type forgotInputs = z.infer<typeof forgotSchema>;

export type resetPayload = {
  email: string;
};

export type requestPayload = {
  email: string;
};

export default function useForgot() {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<forgotInputs>({
    resolver: zodResolver(forgotSchema),
    mode: 'onChange',
  });

  const mutationForgot = useMutation({
    mutationFn: async (resData: resetPayload) => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resData),
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
      setCooldown(60);
      reset();
      toaster.create({
        title: 'Reset password link has been sent',
        description: 'Please check your email.',
        type: 'success',
        duration: 5000,
      });
    },

    onError: (error: any) => {
      if (error?.message) {
        setError('root', {
          message: error.message,
        });
      }
    },
  });

  const onSubmit = async (data: forgotInputs) => {
    mutationForgot.mutate({
      email: data.email,
    });
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    mutationForgot,
    cooldown,
  };
}
