import { RouteGuardPolicyCardio } from './_components';
export default function CardioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RouteGuardPolicyCardio />
      {children}
    </div>
  );
}
