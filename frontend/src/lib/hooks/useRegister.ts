import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { BACKEND_URL } from '@/lib/constants';
import { toaster } from '@/components/ui/toaster';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

const registerSchema = z
  .object({
    username: z.string().min(3, 'Username should contain at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .regex(
        passwordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .min(8, 'Password should contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type RegisterInputs = z.infer<typeof registerSchema>;

export type registerPayload = {
  username: string;
  email: string;
  password: string;
};

export default function useRegister() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver: zodResolver(registerSchema), mode: 'onChange' });

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (user: registerPayload) => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        // Network worked, but backend returned error
        const data = await res.json();
        if (!res.ok) {
          throw data;
        }

        return data;
      } catch (err) {
        if (err instanceof Error) {
          throw { message: err.message };
        }

        if (typeof err === 'object' && err !== null && 'message' in err) {
          throw { message: (err as any).message };
        }

        throw { message: 'Cannot connect to the server. Please try again later.' };
      }
    },
    onSuccess: (data) => {
      reset();
      toaster.create({
        title: 'Verification email sent',
        description: 'Please check your inbox to continue registration.',
        type: 'success',
        duration: 5000,
      });

      setTimeout(() => {
        router.push(`/verify?email=${encodeURIComponent(data.data.email)}`);
      }, 3000);
    },

    onError: (error: any) => {
      console.log(error);
      if (error?.message) {
        setError('root', {
          message: error.message,
        });
      }
    },
  });

  const onSubmit = async (data: RegisterInputs) => {
    mutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };
  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    mutation,
  };
}
