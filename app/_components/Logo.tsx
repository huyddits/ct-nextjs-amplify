import { cn } from '@/lib/utils';

export default function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn(
        'h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4',
        className
      )}
    >
      <img src={'/logo.jpg'} alt="logo source" />
    </div>
  );
}
