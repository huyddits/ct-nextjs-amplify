'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
export default function BottomNavigationItem({
  component: IconComponent,
  href,
  isActive,
  label,
}: {
  href: string;
  isActive: boolean;
  label: string;
  component: React.ComponentType<any>;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'min-w-[44px] min-h-[44px] flex flex-col items-center justify-center text-xs',
        isActive ? 'text-primary' : 'text-gray-500'
      )}
    >
      <IconComponent
        className={cn('h-6 w-6 mb-1 text-primary', isActive ? 'text-primary' : 'text-gray-500')}
      />
      <span>{label}</span>
    </Link>
  );
}
