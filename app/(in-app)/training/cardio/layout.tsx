import { RouteGuardPolicyCardio } from './_components';
import { ContentWrapperGuard } from '../../_components';
export default function CardioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RouteGuardPolicyCardio />
      <ContentWrapperGuard policy="cardio">{children}</ContentWrapperGuard>
    </div>
  );
}
