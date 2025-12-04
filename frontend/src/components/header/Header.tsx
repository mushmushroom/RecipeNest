'use client';
// import { useSession } from 'next-auth/react';
import { Box, Flex, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import GlobalContainer from '../GlobalContainer';
import Image from 'next/image';
import Link from 'next/link';
import { AppPathPublic } from '@/lib/constants';

import SearchInput from './SearchInput';
import HeaderMenu from './HeaderMenu';
import MobileSearch from './MobileSearch';
import MobileMenuDrawer from './MobileMenuDrawer';
import { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null;
}
export default function Header({ session }: HeaderProps) {

  return (
    <Box as="header" bgColor="brand.500" paddingY="3.5rem">
      <GlobalContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="4rem">
            {/* Logo */}
            <Link href={AppPathPublic.Home}>
              <Image src="/logo.svg" width={169} height={47} alt="Logo" />
            </Link>
            {/* Desktop search only */}
            <Box hideBelow="lg">
              <SearchInput />
            </Box>
          </Flex>
          {/* Mobile search + Mobile menu */}
          {/* Mobile only */}
          <Flex alignItems="center" gap="20px" hideFrom="lg">
            <MobileSearch />
            <MobileMenuDrawer session={session} />
          </Flex>

          {/* Desktop menu only */}
          <Box hideBelow="lg">
            <HeaderMenu session={session} />
          </Box>
        </Flex>
      </GlobalContainer>
    </Box>
  );
}
