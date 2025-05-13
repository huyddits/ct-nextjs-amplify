'use client';
import { useEffect } from 'react';
import { AppLoadingFullScreen } from '@/components/compose';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store';

export default function TwitterCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setToken } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('accessToken') as string;

    if (token) {
      setToken(token);
      router.replace('/home'); // or redirect to /dashboard
    } else {
      setToken(null);
      router.replace('/login');
    }
  }, [searchParams]);
  return <AppLoadingFullScreen />;
}
