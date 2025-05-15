import { RoutineForm } from '../../_components/RoutineForm';

export default function EditRoutinePage({ params }: { params: { id: string } }) {
  return (
    <div className="padding-top-nav">
      <RoutineForm id={params.id} />
    </div>
  );
}
