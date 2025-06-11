import { ProgramDetail } from '../_components';

export default async function ProgramEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <ProgramDetail programId={id} />;
}
