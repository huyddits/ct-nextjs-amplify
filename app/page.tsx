'use client';

import { redirect, useRouter } from 'next/navigation';
import { ROUTES, STORAGE_KEY } from '@/utils/constants';

export default function Home() {
  const token = localStorage.getItem(STORAGE_KEY.TOKEN);

  return token ? redirect(`/${ROUTES.HOME}`) : redirect(`/${ROUTES.WELCOME}`);
}
