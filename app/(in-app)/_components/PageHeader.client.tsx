'use client';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function PageHeader({
  href,
  title,
  allowBack,
}: {
  title: string;
  href?: string;
  allowBack?: boolean;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-center py-4 relative">
        {href && (
          <Link href={href} className="absolute left-0 flex items-center text-primary text-sm">
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            <span>Back</span>
          </Link>
        )}
        {allowBack && (
          <Button
            variant="link"
            className="absolute left-0 hover:no-underline"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            <span>Back</span>
          </Button>
        )}
        <h1 className="text-xl font-semibold text-primary">{title}</h1>
      </div>
    </div>
  );
}
