'use client';

import { useSafeAreaInset } from '@/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerClient() {
  const { insetTop } = useSafeAreaInset();
  return <ToastContainer style={{ marginTop: insetTop }} />;
}
