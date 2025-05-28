import { ROUTES } from '@/utils/constants';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Cheer Trainer. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link href={`/${ROUTES.PRIVACY}`} className="hover:text-primary">
          Privacy Policy
        </Link>
        <Link href={`/${ROUTES.TERMS_AND_CONDITIONS}`} className="hover:text-primary">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
