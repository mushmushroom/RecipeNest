'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/lib/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Global, css } from '@emotion/react';
import { NuqsAdapter } from 'nuqs/adapters/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ChakraProvider value={system}>
            <Global
              styles={css`
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #fdfaf6;
                  color: #1e1e1e;
                  font-family: var(--font-nunito);
                }
              `}
            />
            {children}
          </ChakraProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </SessionProvider>
  );
}
