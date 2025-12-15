'use client';

import { HStack, Box, Link, Flex } from '@chakra-ui/react';
// import Link from 'next/link';
import { CustomButton } from '../common/CustomButton';
import { AppPathProtected, AppPathPublic } from '@/lib/constants';
import LoginButton from './LoginButton';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

const headerMenuLinks = [
  { text: 'All recipes', href: AppPathPublic.Recipes },
  { text: 'Favorites', href: AppPathProtected.Favorites },
  { text: 'My account', href: AppPathProtected.MyRecipes },
];
interface HeaderMenuProps {
  session: Session | null;
}
export default function HeaderMenu({ session }: HeaderMenuProps) {
  // const { isSessionReady, loading } = useAuth();
  const router = useRouter();
  // if (loading) return null;

  return (
    <Box as="nav">
      <HStack gap="1rem">
        {session?.user ? (
          headerMenuLinks.map((item) => (
            <CustomButton asChild variant="link" key={item.href}>
              <Link href={item.href}>{item.text}</Link>
            </CustomButton>
          ))
        ) : (
          <Flex gap="4rem">
            <Link href={AppPathPublic.Recipes} style={{ fontSize: '2.2rem' }}>
              All recipes
            </Link>
            <LoginButton />
          </Flex>
        )}
      </HStack>
    </Box>
  );
}
