'use client';

import { HStack, Box, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { CustomButton } from '../common/CustomButton';
import { AppPathProtected, AppPathPublic } from '@/lib/constants';
import { useAuthData } from '@/lib/hooks/useAuth';
import LoginButton from './LoginButton';

const headerMenuLinks = [
  { text: 'All recipes', href: AppPathPublic.Recipes },
  { text: 'Favorites', href: AppPathProtected.Favorites },
  { text: 'My account', href: AppPathProtected.MyRecipes },
];

export default function HeaderMenu() {
  const { isSessionReady } = useAuthData();

  if (!isSessionReady) return <Spinner />;
  return (
    <Box as="nav">
      <HStack gap="1rem">
        {isSessionReady ? (
          headerMenuLinks.map((item) => (
            <CustomButton asChild variant="link" key={item.href}>
              <Link href={item.href}>{item.text}</Link>
            </CustomButton>
          ))
        ) : (
          <LoginButton />
        )}
      </HStack>
    </Box>
  );
}
