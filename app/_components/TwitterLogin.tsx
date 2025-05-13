'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useLogin } from '../(auth)/login/_hooks';
import { SocialProvider } from '@/utils/types';

export function TwitterLogin(props: any) {
  const { loginWithProvider } = useLogin({
    onSuccess: () => {},
  });
  const onClick = async () => {
    loginWithProvider({ provider: SocialProvider.Twitter });
  };
  return (
    <Button variant="outline" className="w-full" onClick={onClick} disabled>
      <Icon icon="simple-icons:twitter" color="#1DA1F2" />
      <span className="sr-only">Twitter</span>
    </Button>
  );
}
