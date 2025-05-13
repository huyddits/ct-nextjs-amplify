'use client';
import React, { JSX } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
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
      className={twMerge(
        'min-w-[44px] min-h-[44px] flex flex-col items-center justify-center text-xs',
        isActive ? 'text-primary' : 'text-gray-500'
      )}
    >
      <IconComponent
        className={twMerge(
          'h-6 w-6 mb-1 text-primary',
          isActive ? 'text-primary' : 'text-gray-500'
        )}
      />
      <span>{label}</span>
    </Link>
  );
}
