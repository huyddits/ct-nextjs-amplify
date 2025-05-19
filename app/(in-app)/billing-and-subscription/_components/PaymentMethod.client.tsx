'use client';
import { CreditCardIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaymentMethodProps {
  className?: string;
}

export default function PaymentMethod({ className }: PaymentMethodProps) {
  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Payment Method</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded mr-3">
            <CreditCardIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium">Visa ending in 4242</div>
            <div className="text-xs text-gray-500">Expires 09/2026</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-sm">
          Change
        </Button>
      </div>
      <div className="text-xs text-gray-500 flex items-center">
        <CheckCircleIcon className="h-3 w-3 mr-1 text-green-600" />
        <span>Your payment information is stored securely</span>
      </div>
    </div>
  );
}
