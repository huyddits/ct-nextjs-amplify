'use client';
import { CheckCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';

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
            <Icon icon="simple-icons:stripe" width="24" height="24"></Icon>
          </div>
          <div>
            <div className="text-sm font-medium">Redirect to Stripe for payment</div>
            <div className="text-xs text-gray-500">Fast, secure and easy</div>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 flex items-center">
        <CheckCircleIcon className="h-3 w-3 mr-1 text-green-600" />
        <span>Your payment information is stored securely</span>
      </div>
    </div>
  );
}
