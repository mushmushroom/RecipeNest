'use client';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header>
      <p>This is header</p>
      {/* {status === 'authenticated' && <p>{session?.user.email}</p>} */}
      {/* <p>{status}</p> */}
      {/* <p>{session?.user.email}</p> */}
    </header>
  );
}
