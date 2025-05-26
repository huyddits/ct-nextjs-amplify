'use client';
import { CheckCircle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="p-6 rounded-xl shadow-sm max-w-md w-full">
        <div className="flex justify-center mb-4 text-green-600">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-semibold text-green-700 mb-2">Payment Successful</h1>
        <p className="text-sm text-gray-600 mb-6">
          Thank you! Your subscription has been activated. You can now access all features.
        </p>

        <Link href={`/${ROUTES.HOME}`} className="hover:underline text-primary text-sm">
          Back to Home
        </Link>
      </div>
      <div className="padding-bottom-app" />
    </div>
  );
}
