'use client';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PromoCodeProps {
  className?: string;
  onApply?: (value: string) => void;
}

export default function PromoCode({ className, onApply }: PromoCodeProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const handleApplyPromo = () => {
    console.log('handleApplyPromo', promoCode);
    onApply?.(promoCode);
  };
  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Promotional Code</h2>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter promo code"
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
          className="text-sm"
        />
        <Button
          variant="outline"
          size="sm"
          className="whitespace-nowrap"
          onClick={handleApplyPromo}
        >
          Apply Code
        </Button>
      </div>
      {promoApplied && (
        <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md">
          <div className="flex items-center">
            <TagIcon className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-green-700 font-medium">CHEER1 applied!</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            15% discount on 3-month subscriptions has been applied
          </p>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-2">
        Enter a valid promotional code to receive discounts on your subscription
      </div>
    </div>
  );
}
