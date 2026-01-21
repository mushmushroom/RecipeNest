'use client';
import { toaster } from '@/components/ui/toaster';
import { AppPathPublic, BACKEND_URL } from '@/lib/constants';
import { useFetchAuth } from '../useFetchAuth';
import { signOut } from 'next-auth/react';

export default function useDeleteAccount() {
  const { token } = useFetchAuth(true);

  async function deleteAccount() {
    try {
      const response = await fetch(`${BACKEND_URL}/user/me`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
      toaster.create({
        title: 'Success',
        description: 'Account was deleted successfully',
        type: 'success',
      });

      setTimeout(() => {
        signOut({
          redirect: true,
          callbackUrl: AppPathPublic.Recipes,
        });
      }, 3000);
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
    deleteAccount,
  };
}
