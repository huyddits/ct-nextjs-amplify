'use client';
import { TabNavigation } from '@/app/(in-app)/_components';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

export default function TabNavigationHitMiss() {
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  return (
    <TabNavigation
      listTabs={[
        {
          title: 'Routines',
          value: 'routines',
        },
        {
          title: 'Report',
          value: 'report',
        },
        {
          title: 'Data',
          value: 'data',
        },
      ]}
      value={subPath}
      prefixPath={`/${ROUTES.HIT_MISS}`}
      className="fixed w-full z-20 shadow top-0"
    />
  );
}
