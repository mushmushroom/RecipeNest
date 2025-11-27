import { useSession } from 'next-auth/react';

/**
 * @param requireAuth - Boolean: Only use true if you must have an authenticated user.
 */
export function useAuthData(requireAuth: boolean = false) {
  const { data: session, status } = useSession();

  const token = session?.backendTokens.accessToken ?? '';

  const rawId = session?.user.id as number | string | undefined;
  const sessionId =
    typeof rawId === 'number' ? rawId : typeof rawId === 'string' ? Number(rawId) : 0;

  const loading = status === 'loading';
  const hasId = rawId != null && String(rawId).length > 0 && !Number.isNaN(sessionId);
  const isSessionReady = status === 'authenticated' && hasId;

  if (requireAuth && !loading && !isSessionReady) {
    throw new Error('User is not authenticated');
  }

  return { token, sessionId, isSessionReady, loading };
}
