'use client';

import { HStack, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { CustomButton } from '../common/CustomButton';
import { AppPathProtected, AppPathPublic } from '@/lib/constants';

const headerMenuLinks = [
  { text: 'All recipes', href: AppPathPublic.Recipes },
  { text: 'Favorites', href: AppPathProtected.Favorites },
  { text: 'My account', href: AppPathProtected.MyRecipes },
];

export default function HeaderMenu() {
  return (
    <Box as="nav">
      <HStack gap="1rem">
        {headerMenuLinks.map((item) => (
          <CustomButton asChild variant="link" key={item.href}>
            <Link href={item.href}>{item.text}</Link>
          </CustomButton>
        ))}
      </HStack>
    </Box>
  );
}
