import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-lg font-bold">CT</span>
        </div>
        <p className="text-gray-600 mb-4">
          © {new Date().getFullYear()} Cheer Trainer. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            href="/privacy-policy"
            className="text-gray-600 hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-gray-600 hover:text-primary"
          >
            Terms & Conditions
          </Link>
          <Link href="/about-us" className="text-gray-600 hover:text-primary">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
