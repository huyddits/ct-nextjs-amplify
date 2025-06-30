'use client';
import { useAcknowledgement } from '@/hooks';

export default function ContentWrapperGuard({
  children,
  policy,
}: {
  children: React.ReactNode;
  policy: 'strength' | 'cardio' | 'fitness';
}) {
  const { acknowledgementCardio, acknowledgementFitness, acknowledgementStrength } =
    useAcknowledgement();

  if (acknowledgementCardio && policy === 'cardio') {
    return <>{children}</>;
  }
  if (acknowledgementFitness && policy === 'fitness') {
    return <>{children}</>;
  }
  if (acknowledgementStrength && policy === 'strength') {
    return <>{children}</>;
  }
  return null;
}
