'use client';
import { AppPathProtected, AppPathPublic } from '@/lib/constants';
import { Box, Button, Separator } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const userDashboardLinks = [
  {
    text: 'My recipes',
    href: AppPathProtected.MyRecipes,
  },
  {
    text: 'Favorites',
    href: AppPathProtected.Favorites,
  },
  {
    text: 'Settings',
    href: AppPathProtected.Settings,
  },
  {
    text: 'Logout',
    href: '',
  },
];
export default function UserAside() {
  const pathname = usePathname();
  return (
    <Box as="aside">
      {userDashboardLinks.map((item, index) => {
        return (
          <Box
            color={pathname === item.href ? 'brand.500' : 'black'}
            fontWeight={pathname === item.href ? '700' : '400'}
          >
            {item.text === 'Logout' ? (
              <Button
                variant="ghost"
                paddingLeft="1rem"
                fontSize="2.2rem"
                paddingBottom="2rem"
                paddingTop={index !== userDashboardLinks.length ? '2rem ' : 0}
                height="100%"
                width="100%"
                justifyContent="flex-start"
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
              <>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    paddingLeft="1rem"
                    fontSize="2.2rem"
                    paddingBottom="2rem"
                    paddingTop={index !== userDashboardLinks.length ? '2rem ' : 0}
                    height="100%"
                    color={pathname === item.href ? 'brand.500' : 'black'}
                    fontWeight={pathname === item.href ? '700' : '400'}
                    width="100%"
                    justifyContent="flex-start"
                  >
                    {item.text}
                  </Button>
                </Link>
                {index !== userDashboardLinks.length && <Separator borderColor="black" />}
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
