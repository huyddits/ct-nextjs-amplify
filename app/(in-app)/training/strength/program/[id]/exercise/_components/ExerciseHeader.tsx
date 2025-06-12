import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export default function ExerciseHeader({ programId, title }: { programId: number; title: string }) {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href={`/${ROUTES.TRAINING_STRENGTH}`} className="text-gray-600">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>
      <h1 className="text-xl font-semibold text-center flex-1 absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1>
      <Link href={`/${ROUTES.TRAINING_STRENGTH_PROGRAM}/${programId}`}>
        <button className="text-primary font-medium">Edit Program</button>
      </Link>
    </div>
  );
}
