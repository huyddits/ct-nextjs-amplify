import { SafeAreaDetection } from '@/app/_components';
import { TabNavigationCheckOff } from './_components';

export default function CheckOffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SafeAreaDetection position="top" />
      <TabNavigationCheckOff />
      <div>{children}</div>
      <div className="h-16" />
      <SafeAreaDetection position="bottom" />
    </div>
  );
}
