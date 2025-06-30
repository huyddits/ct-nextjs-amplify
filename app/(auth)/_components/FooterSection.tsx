import { ROUTES } from '@/utils/constants';
import Link from 'next/link';

type Props = {
  onNavigate?: () => void;
};
export default function FooterSection({ onNavigate }: Props) {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Cheer Trainer. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link href={`/${ROUTES.PRIVACY}`} className="hover:text-primary" onClick={onNavigate}>
          Privacy Policy
        </Link>
        <Link
          href={`/${ROUTES.TERMS_AND_CONDITIONS}`}
          className="hover:text-primary"
          onClick={onNavigate}
        >
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
