'use client';
import UserAside from '@/components/account/UserAside';
import UserHeader from '@/components/account/UserHeader';
import GlobalContainer from '@/components/GlobalContainer';
import Header from '@/components/header/Header';
import { Box, Grid, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Box as="main" paddingY="4rem">
        <GlobalContainer>
          <UserHeader />
          <Box as="section">
            <Grid
              gap="12rem"
              templateColumns={{
                base: '1fr',
                md: '190px 1fr',
              }}
            >
              <Box hideBelow="md">
                <UserAside />
              </Box>
              {children}
            </Grid>
          </Box>
        </GlobalContainer>
      </Box>
    </>
  );
}
