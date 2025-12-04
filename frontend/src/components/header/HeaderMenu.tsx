'use client';

import { HStack, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { CustomButton } from '../common/CustomButton';
import { AppPathProtected, AppPathPublic } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import LoginButton from './LoginButton';
import { Session } from 'next-auth';

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
          <LoginButton />
        )}
      </HStack>
    </Box>
  );
}
