import Header from '@/components/header/Header';
import { authOptions } from '@/lib/config/auth';
import { Box } from '@chakra-ui/react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'RecipeNest',
  description: 'All your favorite recipes in one place',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header session={session} />
      <Box as="main" py={{ base: '2rem', md: '4rem' }}>
        {children}
      </Box>
    </>
  );
}
