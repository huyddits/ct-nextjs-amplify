import { AlertTriangle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';

export default function CheckoutFailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="p-6 rounded-xl shadow-sm max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-600">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-semibold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-sm text-gray-600 mb-6">
          We couldn’t complete your checkout. Please try again or contact support if the issue
          persists.
        </p>

        <Link
          href={`/${ROUTES.BILLING_AND_SUBSCRIPTION}`}
          className="text-primary hover:underline text-sm"
        >
          Try again
        </Link>
      </div>
      <div className="padding-bottom-app" />
    </div>
  );
}
