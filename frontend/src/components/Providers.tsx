'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/lib/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </QueryClientProvider>
    </SessionProvider>
  );
}
