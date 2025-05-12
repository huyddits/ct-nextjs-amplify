import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { FacebookLogin } from './FacebookLogin';

export default function SSOViaSocial({ type }: { type: 'signup' | 'signin' }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <FacebookLogin />
      <Button variant="outline" className="w-full" disabled>
        <Icon icon="simple-icons:twitter" color="#1DA1F2" />
        <span className="sr-only">Twitter</span>
      </Button>
      <Button variant="outline" className="w-full" disabled>
        <Icon icon="simple-icons:instagram" color="#E1306C" />
        <span className="sr-only">Instagram</span>
      </Button>
    </div>
  );
}
