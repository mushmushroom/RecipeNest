import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AppPathPublic, BACKEND_URL } from '@/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';

const verifySchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(1, 'Please enter your code'),
});

type verifyInputs = z.infer<typeof verifySchema>;

export type verifyPayload = {
  email: string;
  otp: string;
};
export type requestPayload = {
  email: string;
};

export default function useVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
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
    watch,
    formState: { errors },
  } = useForm<verifyInputs>({
    resolver: zodResolver(verifySchema),
    mode: 'onChange',
    defaultValues: {
      email,
    },
  });

  const emailValue = watch('email');

  const mutationVerify = useMutation({
    mutationFn: async (verData: verifyPayload) => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
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
        title: 'Your account was verified successfully',
        description: 'You will now be redirected to the login page.',
        type: 'success',
        duration: 5000,
      });

      setTimeout(() => {
        router.push(`${AppPathPublic.Login}`);
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

  const onSubmit = async (data: verifyInputs) => {
    mutationVerify.mutate({
      email: data.email,
      otp: data.otp,
    });
  };

  const mutationRequest = useMutation({
    mutationFn: async (reqData: requestPayload) => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/request-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqData),
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
      // reset({ otp });
      toaster.create({
        title: 'OTP code was resent.',
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

  function requestOtp() {
    if (!emailValue) {
      toaster.create({
        title: 'Email missing',
        description: 'Enter your email to request a new OTP.',
      });
      return;
    }

    mutationRequest.mutate(
      { email: emailValue },
      {
        onSuccess: () => {
          setCooldown(60);
        },
      }
    );
  }
  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    mutationVerify,
    mutationRequest,
    requestOtp,
    cooldown,
  };
}
