'use client';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { RoutineCard } from '../_components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
export default function RoutinesPage() {
  const router = useRouter();
  const competitionSeasonRoutine: { id: string; name: string }[] = [
    { id: 'competition-0', name: 'Opening Tucks' },
    { id: 'competition-1', name: 'Double Full Basket' },
    { id: 'competition-2', name: 'Elite 1' },
    { id: 'competition-3', name: 'Elite 2' },
    { id: 'competition-4', name: 'Pyramid' },
    { id: 'competition-5', name: 'Cheer' },
  ];

  const gameDayPerformance: { id: string; name: string }[] = [
    { id: 'performance-0', name: 'Opening Stunt' },
    { id: 'performance-1', name: 'X Full Basket' },
    { id: 'performance-2', name: 'Elite 1' },
    { id: 'performance-3', name: 'Pyramid' },
  ];

  const gameDayPepRally: { id: string; name: string }[] = [
    { id: 'pep-0', name: 'Opening Stunt' },
    { id: 'pep-1', name: 'Baskets' },
    { id: 'pep-2', name: 'Cheer 1' },
  ];

  const onCreate = () => {
    router.push(`/${ROUTES.HIT_MISS_ROUTINES_NEW}`);
  };

  return (
    <div className="pb-20 pt-12">
      <div className="px-4 py-3">
        <Button className="w-full" size="lg" onClick={onCreate}>
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          New Routine
        </Button>
      </div>
      <div className="px-4 py-2">
        <RoutineCard id="1" listItems={competitionSeasonRoutine} />
        <RoutineCard id="2" listItems={gameDayPerformance} />
        <RoutineCard id="3" listItems={gameDayPepRally} />
      </div>
    </div>
  );
}
