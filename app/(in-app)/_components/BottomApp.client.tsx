'use client';

import {
  RulerIcon,
  TargetIcon,
  DumbbellIcon,
  UserCircle2Icon,
  ClipboardCheckIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import BottomNavigationItem from './BottomNavigationItem.client';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/utils/constants';
export default function BottomApp() {
  const { token } = useAuthStore();
  const pathname = usePathname();
  const listItems = [
    {
      name: 'Home',
      href: `/${ROUTES.HOME}`,
      icon: UserCircle2Icon,
    },
    {
      name: 'Training',
      href: `/${ROUTES.TRAINING}`,
      icon: DumbbellIcon,
    },
    {
      name: 'Measurement',
      href: `/${ROUTES.MEASUREMENT}`,
      icon: RulerIcon,
    },
    {
      name: 'Hit/Miss',
      href: `/${ROUTES.HIT_MISS}`,
      icon: TargetIcon,
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
                isActive={pathname.startsWith(item.href)}
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
