'use client';

import {
  UserCircle2Icon,
  DumbbellIcon,
  RulerIcon,
  HeartPulseIcon,
  ClipboardCheckIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import BottomNavigationItem from './BottomNavigationItem.client';
import { useAuthStore } from '@/store';
export default function BottomApp() {
  const { token } = useAuthStore();
  const pathname = usePathname();
  console.log(pathname);
  const listItems = [
    {
      name: 'Home',
      href: '/home',
      icon: UserCircle2Icon,
    },
    {
      name: 'Training',
      href: '/training',
      icon: DumbbellIcon,
    },
    {
      name: 'Measure',
      href: '/measure',
      icon: RulerIcon,
    },
    {
      name: 'Health',
      href: '/health',
      icon: HeartPulseIcon,
    },
    {
      name: 'Report',
      href: '/report',
      icon: ClipboardCheckIcon,
    },
  ];

  if (!token) {
    return <div></div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center py-2 px-4">
            {listItems.map(item => (
              <BottomNavigationItem
                key={item.href}
                href={item.href}
                isActive={pathname === item.href}
                label={item.name}
                component={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
