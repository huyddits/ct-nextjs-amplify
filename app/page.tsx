'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, STORAGE_KEY } from '@/utils/constants';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    router.push(token ? ROUTES.HOME : ROUTES.WELCOME);
  });
}
