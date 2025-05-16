import { TabNavigationHitMiss } from './_components';

export default function HitMissLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigationHitMiss />
      <div className="container">{children}</div>
      <div className="h-16" />
    </div>
  );
}
