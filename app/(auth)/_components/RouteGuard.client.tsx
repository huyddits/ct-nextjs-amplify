'use client';

import { ROUTES, STORAGE_KEY } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppLoadingFullScreen } from '@/components/compose';

export default function Redirect() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    if (!token) {
      setIsChecking(false);
      return;
    }
    router.replace(`/${ROUTES.HOME}`);
  }, [router]);

  if (isChecking) return <AppLoadingFullScreen />;

  return null;
}
