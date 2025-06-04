import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { Logo } from '@/app/_components';

export default function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <Logo className="w-12 h-12" />
        <p className="text-gray-600 mb-4">
          © {new Date().getFullYear()} Cheer Trainer. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href={`/${ROUTES.PRIVACY}`} className="text-gray-600 hover:text-primary">
            Privacy Policy
          </Link>
          <Link
            href={`/${ROUTES.TERMS_AND_CONDITIONS}`}
            className="text-gray-600 hover:text-primary"
          >
            Terms & Conditions
          </Link>
          <Link href={`/${ROUTES.ABOUT_US}`} className="text-gray-600 hover:text-primary">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
