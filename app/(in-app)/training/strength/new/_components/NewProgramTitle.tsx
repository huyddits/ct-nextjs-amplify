import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';
export default function NewProgramTitle() {
  return (
    <div>
      <div className="flex items-center justify-center py-4 relative">
        <Link
          href={`/${ROUTES.TRAINING_STRENGTH}`}
          className="absolute left-0 flex items-center text-primary text-sm"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          <span>Back</span>
        </Link>
        <h1 className="text-xl font-semibold text-primary">Create Program</h1>
      </div>
    </div>
  );
}
