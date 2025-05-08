import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

export default function SSOViaSocial({ type }: { type: 'signup' | 'signin' }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <Button variant="outline" className="w-full">
        <Icon icon="simple-icons:facebook" color="#1877F2" />
        <span className="sr-only">Facebook</span>
      </Button>
      <Button variant="outline" className="w-full">
        <Icon icon="simple-icons:twitter" color="#1DA1F2" />
        <span className="sr-only">Twitter</span>
      </Button>
      <Button variant="outline" className="w-full">
        <Icon icon="simple-icons:instagram" color="#E1306C" />
        <span className="sr-only">Instagram</span>
      </Button>
    </div>
  );
}
