'use client';
import { useSession } from 'next-auth/react';
import { Text } from '@chakra-ui/react';

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header>
      <Text textAlign="center" padding="3rem" backgroundColor="gray.400">
        This is header
      </Text>
      {/* {status === 'authenticated' && <p>{session?.user.email}</p>} */}
      {/* <p>{status}</p> */}
      {/* <p>{session?.user.email}</p> */}
    </header>
  );
}
