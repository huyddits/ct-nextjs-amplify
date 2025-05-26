import { CheckCircleIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BillingCycle, PlanType } from '@/utils/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface PlanCardProps {
  planName: string;
  planType: PlanType;
  basePrice: number;
  salePrice: number;
  savePercent?: number;
  billingText: string;
  chargeInterval: BillingCycle;
  isCurrent: boolean;
  isSelected: boolean;
  promoApplied?: boolean;
  promoCode?: string;
  showRibbon?: boolean;
  onSwitch: () => void;
  onSelect: () => void;
}

export const PriceHolder = ({
  basePrice,
  salePrice,
  savePercent,
  promoApplied,
}: {
  basePrice: number;
  salePrice?: number;
  savePercent?: number;
  promoApplied?: boolean;
}) => {
  return (
    <div className="flex items-center">
      {!basePrice ? (
        <div className="text-sm text-gray-600 mr-2">Free</div>
      ) : (
        <div className={cn('text-sm text-gray-600 mr-2', promoApplied && 'line-through')}>
          ${basePrice.toFixed(2)}
        </div>
      )}
      {!!salePrice && !!promoApplied && (
        <div
          className={cn('text-sm font-medium', promoApplied ? 'text-green-600' : 'text-blue-600')}
        >
          ${salePrice.toFixed(2)}
        </div>
      )}
      {!!savePercent && !!promoApplied && (
        <Badge className={`ml-2 ${promoApplied ? 'bg-green-600' : 'bg-blue-600'}`}>
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
  salePrice,
  savePercent,
  billingText,
  chargeInterval,
  isCurrent,
  isSelected,
  promoApplied = false,
  promoCode,
  showRibbon = false,
  onSelect,
  onSwitch,
}: PlanCardProps) {
  const borderClass = useMemo(() => {
    if (promoApplied) return 'border-green-300 bg-green-50';
    if (isSelected) return 'border-primary bg-primary/10';
    return 'border-gray-200';
  }, [promoApplied, isSelected]);

  return (
    <div
      className={cn(
        `border rounded-md p-3 flex justify-between items-center overflow-hidden relative`,
        borderClass
      )}
      onClick={onSelect}
    >
      {showRibbon && (
        <div className="absolute -top-1 -right-4">
          <div className="bg-blue-600 text-white text-xs px-4 py-1 rotate-45 translate-x-2 translate-y-2">
            Best Value
          </div>
        </div>
      )}

      <div>
        <div className="font-medium">{planName}</div>

        <PriceHolder
          basePrice={basePrice}
          salePrice={salePrice}
          savePercent={savePercent}
          promoApplied={promoApplied}
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

      {promoApplied && promoCode && (
        <div className="mt-2 text-xs text-green-600 flex items-center absolute bottom-0 left-4">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Promo code {promoCode} applied – {savePercent}% off
        </div>
      )}
    </div>
  );
}
