'use client';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store';

export default function HomePage() {
  const { removeToken } = useAuthStore();
  return (
    <div>
      <Button onClick={removeToken}>Remove Token</Button>
    </div>
  );
}
