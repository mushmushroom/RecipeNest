
import SignInContainer from '@/components/auth/SignInContainer';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <SignInContainer />
      </Suspense>
    );
}
