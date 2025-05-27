'use client';
import { useState } from 'react';
import { TagIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type SubscriptionPlan } from '@/hooks';
import { BillingCycle } from '@/utils/types';
import { AppInput } from '@/components/compose';

interface PromoCodeProps {
  discount?: number;
  className?: string;
  promoCode: string;
  promoApplied?: boolean;
  listPlanApplied?: SubscriptionPlan[];
  onApply?: (value: string) => void;
  onClear?: () => void;
}

export default function PromoCode({
  className,
  promoCode,
  promoApplied,
  listPlanApplied,
  discount,
  onApply,
  onClear,
}: PromoCodeProps) {
  const [value, setValue] = useState('');
  const handleApplyPromo = () => {
    onApply?.(value);
  };

  const renderListPlanApplied = () => {
    return listPlanApplied
      ?.filter(item => item.actualPrice < item.basePrice)
      .map(item => {
        if (item.billingCycle === BillingCycle.ThreeMonths) {
          return '3-month subscription';
        }
        if (item.billingCycle === BillingCycle.Annual) {
          return 'anuual subscription';
        }
        if (item.billingCycle === BillingCycle.Monthly) {
          return 'monthly subscription';
        }
      })
      .join(', ');
  };

  const showIcon = value.length;

  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Promotional Code</h2>
      <div className="flex space-x-2">
        <AppInput
          value={value}
          onChange={e => setValue(e.target.value)}
          className="text-sm"
          inputProps={{ placeholder: 'Enter promo code', className: 'text-sm' }}
          fullWidth
          icon={
            showIcon ? (
              <XIcon
                className="w-3 h-3 cursor-pointer z-10"
                onClick={() => {
                  setValue('');
                  onClear?.();
                }}
              />
            ) : undefined
          }
          iconPosition="end"
        />
        <Button variant="outline" className="whitespace-nowrap" onClick={handleApplyPromo}>
          Apply Code
        </Button>
      </div>
      {promoApplied && (
        <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md">
          <div className="flex items-center">
            <TagIcon className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-green-700 font-medium">{promoCode} applied!</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            {discount}% discount on {renderListPlanApplied()} has been applied
          </p>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-2">
        Enter a valid promotional code to receive discounts on your subscription
      </div>
    </div>
  );
}
