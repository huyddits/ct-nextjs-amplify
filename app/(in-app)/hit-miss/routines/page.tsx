'use client';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { RoutineCard } from '../_components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { useGetHitMissRoutineList } from './_hooks';
export default function RoutinesPage() {
  const { data, isLoading } = useGetHitMissRoutineList();
  const router = useRouter();
  const onCreate = () => {
    router.push(`/${ROUTES.HIT_MISS_ROUTINES_NEW}`);
  };

  return (
    <div className="pb-20 pt-12">
      <div className="px-4 py-3">
        <Button className="w-full" size="lg" onClick={onCreate}>
          <PlusCircleIcon className="size-5 mr-2" />
          New Routine
        </Button>
      </div>
      <div className="px-4 py-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <>
            {!data?.length ? (
              <div className="text-center text-gray-500 py-10">No routines found.</div>
            ) : (
              data.map(routine => <RoutineCard key={routine.routine_id} data={routine} />)
            )}
          </>
        )}
      </div>
    </div>
  );
}
