'use client';

import { useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../constants';
import { useFetchAuth } from './useFetchAuth';
import { ProfileData } from '../types/profileData';

export const getProfileData = async (token: string) => {
  const res = await fetch(`${BACKEND_URL}/user/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch profile data');
  const data = await res.json();
  return data;
};

/* ==============
Hook: Fetch profile data
================= */

export function useProfileData() {
  const { token } = useFetchAuth();
  return useQuery<ProfileData>({
    queryKey: ['profileData'],
    queryFn: () => getProfileData(token),
    enabled: !!token,
  });
}
