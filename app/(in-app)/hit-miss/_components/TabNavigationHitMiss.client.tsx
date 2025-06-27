'use client';
import { TabNavigation } from '@/app/(in-app)/_components';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { useRole } from '@/hooks';

export default function TabNavigationHitMiss() {
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  const { isCoach } = useRole();
  if (!isCoach)
    return (
      <TabNavigation
        listTabs={[
          {
            title: 'Hit/Miss',
            value: 'data',
          },
        ]}
        value={subPath}
        prefixPath={`/${ROUTES.HIT_MISS}`}
        className="fixed w-full z-20 shadow top-0"
      />
    );
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
