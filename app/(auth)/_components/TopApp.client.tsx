'use client';
import { SafeAreaDetection } from '@/app/_components';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constants';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function TopApp({ className }: { className?: string }) {
  return (
    <div className={cn('sticky z-10', className)}>
      <SafeAreaDetection position="top" className="bg-primary" />
      <div className={cn('flex items-center justify-between bg-primary p-4 mb-4 text-white')}>
        <Link href={`/${ROUTES.HOME}`} className="flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}
