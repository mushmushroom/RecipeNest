'use client';
// import { useSession } from 'next-auth/react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import GlobalContainer from './GlobalContainer';
import Image from 'next/image';
import Link from 'next/link';
import { AppPathPublic } from '@/lib/constants';

import SearchInput from './header/SearchInput';
import HeaderMenu from './header/HeaderMenu';
import MobileSearch from './header/MobileSearch';
import MobileMenuDrawer from './header/MobileMenuDrawer';

export default function Header() {
  // const { data: session, status } = useSession();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box as="header" bgColor="brand.500" paddingY="3.5rem">
      <GlobalContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="4rem">
            {/* Logo + Search / Search Icon - on mobile */}
            <Link href={AppPathPublic.Home}>
              <Image src="/logo.svg" width={169} height={47} alt="Logo" />
            </Link>
            {!isMobile && <SearchInput />}
          </Flex>
          {/* Mobile search + Mobile menu */}
          {isMobile ? (
            <Flex alignItems="center" gap="20px">
              <MobileSearch />
              <MobileMenuDrawer />
            </Flex>
          ) : (
            <HeaderMenu />
          )}
        </Flex>
      </GlobalContainer>
    </Box>
  );
}
