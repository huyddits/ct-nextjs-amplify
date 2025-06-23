import { RouteGuardPolicyStrength } from './_components';

export default function StrengthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RouteGuardPolicyStrength />
      {children}
    </div>
  );
}
