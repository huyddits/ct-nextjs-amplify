'use client';

import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface BillingHistoryProps {
  className?: string;
}
export default function BillingHistory({ className }: BillingHistoryProps) {
  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Billing History</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium">March 15, 2025</div>
            <div className="text-xs text-gray-500">Coach Plan</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm font-medium mr-3">$9.99</div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <DownloadIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium">February 15, 2025</div>
            <div className="text-xs text-gray-500">Coach Plan</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm font-medium mr-3">$9.99</div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <DownloadIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Invoice 3 */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium">January 15, 2025</div>
            <div className="text-xs text-gray-500">Coach Plan</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm font-medium mr-3">$9.99</div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <DownloadIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
      <Button variant="link" size="sm" className="text-xs text-primary mt-2 p-0">
        View all billing history
      </Button>
    </div>
  );
}
