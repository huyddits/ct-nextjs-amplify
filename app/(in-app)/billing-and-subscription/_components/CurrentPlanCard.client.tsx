'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BillingCycle, PlanStatus } from '@/utils/types';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface CurrentPlanCardProps {
  name: string;
  price: number;
  status: string;
  className?: string;
  nextBillingDate?: string | null; // exp: 2025-05-24T04:41:31.000Z
  billingCycle: BillingCycle;
  onChangePlan?: () => void;
  onCancelPlan?: () => void;
}

export default function CurrentPlanCard({
  // currentPlan,
  name,
  price,
  status,
  className,
  billingCycle,
  nextBillingDate,
  onChangePlan,
  onCancelPlan,
}: CurrentPlanCardProps) {
  const billPrice = useMemo(() => {
    if (billingCycle === BillingCycle.Annual) {
      return `$${price.toFixed(2)}/year`;
    }
    if (billingCycle === BillingCycle.Monthly) {
      return `$${price.toFixed(2)}/month`;
    }
    if (billingCycle === BillingCycle.ThreeMonths) {
      return `$${price.toFixed(2)} / 3 months`;
    }

    return 'Free';
  }, [billingCycle, price]);

  const billNote = useMemo(() => {
    console.log('status', status);
    if (status === PlanStatus.Canceled) {
      return 'Subscription has been canceled';
    }

    if (billingCycle === BillingCycle.Free) {
      return 'No billing required';
    }

    if (billingCycle === BillingCycle.Annual) {
      return 'Recurring annually until canceled';
    }

    if (billingCycle === BillingCycle.ThreeMonths) {
      return 'Recurring every 3 months until canceled';
    }

    return `Recurring ${billingCycle.toLocaleLowerCase()} until canceled`;
  }, [billingCycle, status]);

  const expiredDate = useMemo(() => {
    if (billingCycle === BillingCycle.Free) {
      return 'No Expired Date';
    }
    return nextBillingDate ? dayjs(nextBillingDate).format('MMM DD, YYYY') : '';
  }, [billingCycle]);

  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Current Plan</h2>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xl font-bold text-primary">{name}</div>
          <div className="text-sm text-gray-600">{billPrice}</div>
          <div className="text-xs text-gray-600 mt-1">{billNote}</div>
        </div>
        <div className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded">
          Active
        </div>
      </div>
      <div className="flex items-center text-sm text-info mb-4">
        <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
        {status === PlanStatus.Canceled ? (
          <span>Plan will be active till: {expiredDate}</span>
        ) : (
          <span>Next billing date: {expiredDate}</span>
        )}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-sm" onClick={onChangePlan}>
          {billingCycle === BillingCycle.Free ? 'Upgrade Plan' : 'Change Plan'}
        </Button>
        {billingCycle !== BillingCycle.Free && status !== PlanStatus.Canceled && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-600 hover:bg-red-50 hover:border-red-50"
            onClick={onCancelPlan}
          >
            Cancel Subscription
          </Button>
        )}
      </div>
    </div>
  );
}
