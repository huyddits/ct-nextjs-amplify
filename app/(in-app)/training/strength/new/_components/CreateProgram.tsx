import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
export default function CreateProgram() {
  return (
    <div>
      <div className="flex items-center justify-center py-4 relative">
        <Link href="/training/strength" className="absolute left-0 flex items-center text-primary">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-xl font-semibold text-">Create Program</h1>
      </div>
    </div>
  );
}
