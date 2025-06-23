import { SafeAreaDetection } from '@/app/_components';
import { TabNavigationHitMiss } from './_components';

export default function HitMissLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SafeAreaDetection position="top" />
      <TabNavigationHitMiss />
      <div>{children}</div>
      <div className="h-16" />
      <SafeAreaDetection position="bottom" />
    </div>
  );
}
