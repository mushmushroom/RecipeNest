'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
// import { Provider } from './ui/provider';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/lib/theme/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </SessionProvider>
  );
}
