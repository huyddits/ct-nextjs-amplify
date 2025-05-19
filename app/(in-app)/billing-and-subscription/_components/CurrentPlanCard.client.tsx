'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface CurrentPlanCardProps {
  className?: string;
}

export default function CurrentPlanCard({ className }: CurrentPlanCardProps) {
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Coach Plan',
    price: 9.99,
    interval: 'monthly',
    status: 'active',
  });

  const [nextBillingDate, setNextBillingDate] = useState<Dayjs>();

  // const planInterval = currentPlan.interval === 'quarterly' ? '3 months' : 'year'
  const planInterval = useMemo(() => {
    if (currentPlan.interval === 'monthly') {
      return 'month';
    } else if (currentPlan.interval === 'quarterly') {
      return '3 months';
    } else {
      return 'year';
    }
  }, [currentPlan.interval]);

  useEffect(() => {
    setNextBillingDate(dayjs().add(1, 'month'));
  }, []);

  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Current Plan</h2>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xl font-bold text-primary">{currentPlan.name}</div>
          <div className="text-sm text-gray-500">
            ${currentPlan.price}/{planInterval}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Recurring {currentPlan.interval} until canceled
          </div>
        </div>
        <div className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded">
          Active
        </div>
      </div>
      <div className="flex items-center text-sm text-info mb-4">
        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
        <span>
          Next billing date: {nextBillingDate ? dayjs(nextBillingDate).format('MMM DD, YYYY') : ''}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-sm">
          Change Plan
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-600 hover:bg-red-50 hover:border-red-50"
        >
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
}
