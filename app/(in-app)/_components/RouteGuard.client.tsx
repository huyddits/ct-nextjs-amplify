'use client';
import { AppLoadingFullScreen } from '@/components/compose';
import { ROUTES, STORAGE_KEY } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteGuard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    if (!token) {
      router.replace(`/${ROUTES.LOGIN}`);
      return;
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) return <AppLoadingFullScreen />;

  return null;
}
