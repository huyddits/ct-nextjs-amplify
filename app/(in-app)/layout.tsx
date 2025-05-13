import { TopApp, BottomApp, RouteGuard } from './_components';
export default function InAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RouteGuard />
      <TopApp />
      <div>{children}</div>
      <BottomApp />
    </div>
  );
}
