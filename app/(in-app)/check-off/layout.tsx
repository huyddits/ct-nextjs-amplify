import { TabNavigationCheckOff } from './_components';

export default function CheckOffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigationCheckOff />
      <div>{children}</div>
      <div className="h-16" />
    </div>
  );
}
