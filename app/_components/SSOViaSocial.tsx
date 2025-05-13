import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { FacebookLogin } from './FacebookLogin';
import { TwitterLogin } from './TwitterLogin';

export default function SSOViaSocial({ type }: { readonly type: 'signup' | 'login' }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <FacebookLogin type={type} />
      <TwitterLogin />
      <Button variant="outline" className="w-full" disabled>
        <Icon icon="simple-icons:instagram" color="#E1306C" />
        <span className="sr-only">Instagram</span>
      </Button>
    </div>
  );
}
