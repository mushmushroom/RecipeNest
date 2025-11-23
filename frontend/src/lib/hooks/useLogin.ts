import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toaster } from '@/components/ui/toaster';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginInputs = z.infer<typeof loginSchema>;

export type loginPayload = {
  email: string;
  password: string;
};

export default function useLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

  const onSubmit = async (data: LoginInputs) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      switch (result.error) {
        case 'UNVERIFIED_USER':
          toaster.create({
            title: 'Account is not verified',
            description: 'Please check your email for the OTP code.',
          });
          router.push(`/verify?email=${data.email}`);
          break;

        case 'CredentialsSignin':
          setError('root', { message: 'Invalid email or password' });
          break;

        default:
          setError('root', { message: result.error });
          break;
      }
      return;
    }

    // SUCCESSFUL LOGIN
    reset();
    toaster.create({
      type: 'success',
      title: 'Logged in!',
      description: 'Redirecting...',
      duration: 3000,
    });

    setTimeout(() => {
      router.push('/my-recipes');
    }, 1500);
  };
  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
  };
}
