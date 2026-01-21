'use client';

import { Drawer, VStack, IconButton, Portal, Button, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import { FaRegWindowClose } from 'react-icons/fa';
import { useState } from 'react';
import { AppPathProtected, AppPathPublic } from '@/lib/constants';
import { useFetchAuth } from '@/lib/hooks/useFetchAuth';
import LoginButton from './LoginButton';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const headerMobileMenuLinks = [
  { text: 'All recipes', href: AppPathPublic.Recipes },
  { text: 'My recipes', href: AppPathProtected.MyRecipes },
  { text: 'Favorites', href: AppPathProtected.Favorites },
  { text: 'Settings', href: AppPathProtected.Settings },
  { text: 'Logout', href: '' },
];

interface MobileMenuDrawerProps {
  session: Session | null;
}
export default function MobileMenuDrawer({ session }: MobileMenuDrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer.Root
        open={isDrawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
        placement="start"
      >
        <Drawer.Trigger asChild>
          <IconButton aria-label="Search" variant="ghost" onClick={() => setDrawerOpen(true)}>
            <IoMenu style={{ width: '35px', height: '35px' }} />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Content
            w="80vw"
            maxW="320px"
            bg="white"
            top="0"
            position="absolute"
            marginRight="40px"
          >
            <Drawer.CloseTrigger asChild marginRight="20px" marginTop="10px">
              <FaRegWindowClose size="20px" />
            </Drawer.CloseTrigger>
            <Drawer.Body paddingRight="40px" paddingLeft="4rem">
              <VStack align="start" gap="4rem" mt="4rem" minHeight="100vh">
                {session?.user ? (
                  headerMobileMenuLinks.map((item) =>
                    item.text === 'Logout' ? (
                      <Button
                        variant="ghost"
                        paddingLeft="0"
                        key={item.href}
                        fontWeight="400"
                        style={{ fontSize: '2.2rem' }}
                        onClick={() =>
                          signOut({
                            redirect: true,
                            callbackUrl: AppPathPublic.Recipes,
                          })
                        }
                      >
                        {item.text}
                      </Button>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        style={{ fontSize: '2.2rem' }}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {item.text}
                      </Link>
                    ),
                  )
                ) : (
                  <Stack gap="4rem">
                    <Link href={AppPathPublic.Recipes} style={{ fontSize: '2.2rem' }}>
                      All recipes
                    </Link>
                    <LoginButton />
                  </Stack>
                )}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Portal>
      </Drawer.Root>
    </>
  );
}
