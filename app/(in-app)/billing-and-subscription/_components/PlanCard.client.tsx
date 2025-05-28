import { CheckCircleIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BillingCycle, PlanType } from '@/utils/types';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import * as $c from '@/utils/converter';
import { calculateSavePercentFromPrice } from '@/utils/helpers';

interface PlanCardProps {
  planName: string;
  planType: PlanType;
  basePrice: number;
  actualPrice: number;
  billingCycle: BillingCycle;
  isCurrent: boolean;
  isPromoApplied?: boolean;
  isSelected: boolean;
  promoApplied?: boolean;
  promoCode?: string;
  showRibbon?: boolean;
  onSwitch: () => void;
  onSelect: () => void;
}

export const PriceHolder = ({
  basePrice,
  actualPrice,
  savePercent,
  promoApplied,
  isPromoApplied,
  billingCycle,
}: {
  basePrice: number;
  actualPrice?: number;
  savePercent?: number;
  promoApplied?: boolean;
  isPromoApplied?: boolean;
  billingCycle: BillingCycle;
}) => {
  const renderCycle = useMemo(() => {
    switch (billingCycle) {
      case BillingCycle.Monthly:
        return '/month';
      case BillingCycle.ThreeMonths:
        return '/quarter';
      case BillingCycle.Annual:
        return '/year';
      default:
        return '';
    }
  }, [billingCycle, isPromoApplied]);

  const hasNewPrice = !!actualPrice && actualPrice !== basePrice;

  return (
    <div className="flex items-center">
      {!basePrice ? (
        <div className="text-sm text-gray-600 mr-2">Free</div>
      ) : (
        <div className={cn('text-sm text-gray-600 mr-2', hasNewPrice && 'line-through')}>
          ${basePrice.toFixed(2)}
          {renderCycle}
        </div>
      )}
      {hasNewPrice && (
        <div
          className={cn(
            'text-sm font-medium',
            promoApplied && isPromoApplied ? 'text-green-600' : 'text-blue-600'
          )}
        >
          ${actualPrice.toFixed(2)}
        </div>
      )}
      {!!savePercent && (
        <Badge
          className={`ml-2 ${promoApplied && isPromoApplied ? 'bg-green-600' : 'bg-blue-600'}`}
        >
          Save {savePercent}%
        </Badge>
      )}
    </div>
  );
};

export function PlanCard({
  planName,
  planType,
  basePrice,
  actualPrice,
  billingCycle,
  isCurrent,
  isSelected,
  isPromoApplied,
  promoApplied = false,
  promoCode,
  showRibbon = false,
  onSelect,
  onSwitch,
}: PlanCardProps) {
  const borderClass = useMemo(() => {
    if (isSelected) return 'border-primary border-2';
    if (promoApplied && isPromoApplied) return 'border-green-300 bg-green-50';
    return 'border-gray-200';
  }, [promoApplied, isSelected, isPromoApplied]);

  const billingText = $c.convertToBillingText(billingCycle);
  const savePercent = calculateSavePercentFromPrice(basePrice, actualPrice);

  return (
    <div
      className={cn(
        `border rounded-md p-3 flex flex-col justify-between items-center overflow-hidden relative`,
        borderClass
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center w-full">
        {showRibbon && (
          <div className="absolute -top-2 -right-2">
            <div
              className={cn(
                'text-white text-xs px-4 py-1 rotate-30 translate-x-2 translate-y-2',
                isPromoApplied ? 'bg-green-600' : 'bg-blue-600'
              )}
            >
              Best Value
            </div>
          </div>
        )}

        <div>
          <div className="font-medium">{planName}</div>
          <PriceHolder
            basePrice={basePrice}
            actualPrice={actualPrice}
            savePercent={savePercent}
            billingCycle={billingCycle}
            promoApplied={promoApplied}
            isPromoApplied={isPromoApplied}
          />

          <div className="text-xs text-gray-600">{billingText}</div>
        </div>

        {isCurrent ? (
          <div className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded">
            Current
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClickCapture={e => {
              e.stopPropagation();
              e.preventDefault();
              onSwitch();
            }}
          >
            Switch
          </Button>
        )}
      </div>

      {promoApplied && promoCode && isPromoApplied && (
        <div className="mt-2 text-xs text-green-600 flex items-center self-start">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Promo code {promoCode} applied – {savePercent}% off
        </div>
      )}
    </div>
  );
}
