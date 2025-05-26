'use client';
import { AppLoadingFullScreen } from '@/components/compose';
import { usePersonalInfo } from '@/hooks';
import { useAuthStore } from '@/store';
import { ROUTES, WHITE_LIST, STORAGE_KEY } from '@/utils/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { setToken } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  usePersonalInfo();
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);

    if (!token) {
      if (!WHITE_LIST.includes(pathname)) {
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
