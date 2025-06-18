'use client';
import {
  ArrowLeftIcon,
  MenuIcon,
  UserCircle2Icon,
  CreditCardIcon,
  ShieldIcon,
  FileTextIcon,
  InfoIcon,
  Share2Icon,
  LogOutIcon,
} from 'lucide-react';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { cn } from '@/lib/utils';
import { useSafeAreaInset } from '@/hooks';
import { SafeAreaDetection } from '@/app/_components';
import { Button } from '@/components/ui/button';

const TopAppBeforeAuth = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <div className={cn('sticky z-10', className)}>
      <SafeAreaDetection position="top" className="bg-primary" />
      <div className={cn('flex items-center justify-between bg-primary p-4 mb-4 text-white')}>
        <Button
          variant="link"
          className="text-white text-md hover:no-underline items-center"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default function TopApp({ className }: { className?: string }) {
  const { insetTop } = useSafeAreaInset();
  const [isOpen, setIsOpen] = useState(false);
  const { removeToken, token } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = () => {
    removeToken();
    location.replace(`/${ROUTES.LOGIN}`);
  };

  if (!token) {
    return <TopAppBeforeAuth className={className} />;
  }

  if (
    pathname.startsWith(`/${ROUTES.TRAINING}`) ||
    pathname.startsWith(`/${ROUTES.MEASUREMENT}`) ||
    pathname.startsWith(`/${ROUTES.HIT_MISS}`) ||
    pathname.startsWith(`/${ROUTES.CHECK_OFF}`)
  ) {
    return null;
  }

  return (
    <div className={cn('sticky z-10', className)}>
      <SafeAreaDetection position="top" className="bg-primary" />
      <div className={cn('flex items-center justify-between bg-primary p-4 mb-4 text-white')}>
        {!pathname.includes(ROUTES.HOME) && (
          <Link href={`/${ROUTES.HOME}`} className="flex items-center">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back</span>
          </Link>
        )}
        {pathname.includes(ROUTES.BILLING_AND_SUBSCRIPTION) && (
          <h2 className="ml-10">Subscription & Billing</h2>
        )}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 flex ml-auto items-center justify-center focus:outline-none">
              <MenuIcon className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              className="cursor-pointer flex items-center"
              onClick={() => router.push(`/${ROUTES.PROFILE}`)}
            >
              <UserCircle2Icon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center"
              onClick={() => router.push(`/${ROUTES.BILLING_AND_SUBSCRIPTION}`)}
            >
              <CreditCardIcon className="mr-2 h-4 w-4" />
              <span>Subscription and Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer flex items-center"
              onClick={() => router.push(`/${ROUTES.PRIVACY}`)}
            >
              <ShieldIcon className="mr-2 h-4 w-4" />
              <span>Privacy Policy</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center"
              onClick={() => router.push(`/${ROUTES.TERMS_AND_CONDITIONS}`)}
            >
              <FileTextIcon className="mr-2 h-4 w-4" />
              <span>Terms and Conditions</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center"
              onClick={() => router.push(`${ROUTES.ABOUT_US}`)}
            >
              <InfoIcon className="mr-2 h-4 w-4" />
              <span>About Us</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex items-center">
              <Share2Icon className="mr-2 h-4 w-4" />
              <span>Share App</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer flex items-center text-red-600"
              onClick={onLogout}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
