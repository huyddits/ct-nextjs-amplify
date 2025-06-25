import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { ComponentProps } from 'react';

type Props = {
  className?: ComponentProps<'div'>['className'];
  text?: string;
};
export function LoaderWithIcon({ className, text }: Props) {
  return (
    <div className={cn(`flex justify-center items-center py-10 gap-2 ${className}`)}>
      <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      {text && <span>{text}</span>}
    </div>
  );
}
