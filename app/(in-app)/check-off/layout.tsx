import { SafeAreaDetection } from '@/app/_components';
import { CheckOffProvider, TabNavigationCheckOff } from './_components';

export default function CheckOffLayout({ children }: { children: React.ReactNode }) {
  return (
    <CheckOffProvider>
      <SafeAreaDetection position="top" />
      <TabNavigationCheckOff />
      <div>{children}</div>
      <div className="h-16" />
      <SafeAreaDetection position="bottom" />
    </CheckOffProvider>
  );
}
