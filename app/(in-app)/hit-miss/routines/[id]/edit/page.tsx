import { RoutineForm } from '../../_components/RoutineForm';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function EditRoutinePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="padding-top-nav">
      <RoutineForm id={id} />
    </div>
  );
}
