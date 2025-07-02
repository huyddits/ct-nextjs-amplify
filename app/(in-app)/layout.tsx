import { SafeAreaDetection } from '../_components';
import { TopApp, BottomApp, RouteGuard } from './_components';
export default function InAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <RouteGuard />
      <SafeAreaDetection className="bg-primary" />
      <TopApp />
      <div>{children}</div>
      <BottomApp />
    </div>
  );
}
