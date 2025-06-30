import { RouteGuardPolicyStrength } from './_components';
import { ContentWrapperGuard } from '../../_components';

export default function StrengthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RouteGuardPolicyStrength />
      <ContentWrapperGuard policy="strength">{children}</ContentWrapperGuard>
    </div>
  );
}
