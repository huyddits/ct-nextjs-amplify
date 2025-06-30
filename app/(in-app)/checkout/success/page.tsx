'use client';
import { CheckCircle } from 'lucide-react';
import { DEEP_LINK_ROOT, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Platform } from '@/utils/types';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const isMobile = searchParams.get('platform') === Platform.mobile;
  const onNavigateOnMobileHome = () => {
    window.location.href = `${DEEP_LINK_ROOT}/${ROUTES.HOME}`;
  };
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

        {isMobile ? (
          <Button variant="link" onClick={onNavigateOnMobileHome}>
            Back to home
          </Button>
        ) : (
          <Link href={`/${ROUTES.HOME}`} className="hover:underline text-primary text-sm">
            Back to Home
          </Link>
        )}
      </div>
      <div className="padding-bottom-app" />
    </div>
  );
}
