import React from 'react';
import { CustomButton } from '../common/CustomButton';
import Link from 'next/link';
import { AppPathPublic } from '@/lib/constants';

export default function LoginButton() {
  return (
    <CustomButton variant="outline" asChild>
      <Link href={AppPathPublic.Login}>Log in</Link>
    </CustomButton>
  );
}
