'use client';
import UserAside from '@/components/account/UserAside';
import UserHeader from '@/components/account/UserHeader';
import GlobalContainer from '@/components/GlobalContainer';
import Header from '@/components/Header';
import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Header />
      <Box as="main" paddingY="4rem">
        <GlobalContainer>
          <UserHeader />
          <Grid gap="12rem" templateColumns={isMobile ? '1fr' : '190px 1fr'}>
            {!isMobile && <UserAside />}
            {children}
          </Grid>
        </GlobalContainer>
      </Box>
    </>
  );
}
