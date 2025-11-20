'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const SignInButton = () => {
  const { data: session, status } = useSession();
  console.log({ status });

  if (status === 'loading') return;

  if (session && session.user)
    return (
      <div className="flex justify-center gap-4 ml-auto">
        <p className="text-sky-600">{session.user.email}</p>
        <Link href={'/api/auth/signout'} className="flex gap-4 text-red-600">
          Sign Out
        </Link>
      </div>
    );

  return (
    <div className="flex gap-4 justify-center items-center">
      <button onClick={() => signIn()} className="text-green-600">
        Sign In
      </button>
      <Link href={'/signup'} className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded">
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
