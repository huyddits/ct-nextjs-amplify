'use client';
import { AppLoadingFullScreen } from '@/components/compose';
import { usePersonalInfo } from '@/hooks';
import { useAuthStore } from '@/store';
import { ROUTES, WHITE_LIST, STORAGE_KEY } from '@/utils/constants';
import { Platform } from '@/utils/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform');
  const { setToken } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  usePersonalInfo();
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);

    if (!token) {
      if (!WHITE_LIST.includes(pathname) && platform !== Platform.mobile) {
        router.replace(`/${ROUTES.LOGIN}`);
      }
    } else {
      setToken(token);
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) return <AppLoadingFullScreen />;

  return null;
}
