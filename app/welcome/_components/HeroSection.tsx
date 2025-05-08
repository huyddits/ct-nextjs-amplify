import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="flex flex-col h-[50vh]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-(--primary)/90 to-(--primary)/70 z-10" />
        <div className="relative h-[50vh] min-h-[400px] bg-cover bg-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-6 text-center">
            {/* Logo */}
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-primary text-3xl font-bold">CT</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Welcome to Cheer Trainer
            </h1>
            <p className="text-xl md:text-2xl font-medium uppercase tracking-wider mb-8">
              Elevate your stunting. Amplify your power. Dominate the mat.
            </p>

            <div className="flex gap-4 mt-4">
              <Link href="/signup">
                <Button size="lg" variant="outline" className="font-semibold text-primary px-8">
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold bg-transparent text-white"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
