'use client';

import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type BillingReceipt } from '@/hooks';
import { formatCurrency } from '@/utils/formatter';
import dayjs from 'dayjs';
import { Pagination } from '@/utils/types';
interface BillingHistoryProps extends Pick<Pagination, 'page' | 'totalPages'> {
  listBillings: BillingReceipt[];
  className?: string;
  onLoadMore?: () => void;
}

const BillingReceiptItem = ({ billingDate, currency, amount, invoicePdf }: BillingReceipt) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div>
        <div className="text-sm font-medium">{dayjs(billingDate).format('MMMM D, YYYY')}</div>
        <div className="text-xs text-gray-500">Coach Plan</div>
      </div>
      <div className="flex items-center">
        <div className="text-sm font-medium mr-3">{formatCurrency(amount, currency)}</div>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-auto"
          onClick={() => open(invoicePdf, '_blank')}
        >
          <DownloadIcon className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};
export default function BillingHistory({
  page,
  totalPages,
  className,
  listBillings,
  onLoadMore,
}: BillingHistoryProps) {
  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Billing History</h2>
      <div className="space-y-3">
        {listBillings.map(item => (
          <BillingReceiptItem key={item.billingId} {...item} />
        ))}
      </div>
      {page < totalPages && (
        <Button
          variant="link"
          size="sm"
          className="text-xs text-primary mt-2 p-0"
          onClick={onLoadMore}
        >
          View all billing history
        </Button>
      )}
    </div>
  );
}
