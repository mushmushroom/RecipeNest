'use client';
import UserAside from '@/components/account/UserAside';
import UserHeader from '@/components/account/UserHeader';
import GlobalContainer from '@/components/GlobalContainer';
import { Box, Grid } from '@chakra-ui/react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
