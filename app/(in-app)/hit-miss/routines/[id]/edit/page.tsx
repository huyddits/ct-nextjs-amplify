import { RoutineForm } from '../../_components/RoutineForm';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];
}

export default async function EditRoutinePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div className="padding-top-nav">
      <RoutineForm id={id} />
    </div>
  );
}
