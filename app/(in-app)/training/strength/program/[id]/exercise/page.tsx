import { ExerciseDetail } from './_components';

export default async function ExerciseProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <ExerciseDetail programId={+id} />;
}
