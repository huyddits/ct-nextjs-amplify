import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section>
      <div className="bg-primary text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Elevate Your Performance?
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Tap &quot;Get Started&quot; to create your profile and begin your
          journey to higher level stunts, stronger bases, and elite flying
          skills.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 font-bold px-8"
          >
            Get Started
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
