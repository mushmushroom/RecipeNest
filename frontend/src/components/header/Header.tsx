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

export default function Header() {
  // const { data: session, status } = useSession();
  // const isMobile = useBreakpointValue({ base: true, lg: false });

  // const [isLargerThanLg] = useMediaQuery(['(min-width: 1024px)']);
  // const isMobile = !isLargerThanLg;

  // if (isMobile === undefined) return null;

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
            <MobileMenuDrawer />
          </Flex>

          {/* Desktop menu only */}
          <Box hideBelow="lg">
            <HeaderMenu />
          </Box>
        </Flex>
      </GlobalContainer>
    </Box>
  );
}
