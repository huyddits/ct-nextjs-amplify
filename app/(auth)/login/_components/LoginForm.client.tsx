'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MailIcon, LockIcon, ChevronRightIcon } from 'lucide-react';
import { Icon } from '@iconify/react';
import { Controller } from 'react-hook-form';
import { AppInput } from '@/components/compose';
import { useLogin } from '../_hooks';
import PasswordStrength from './PasswordStrength.client';
import { SSOViaSocial } from '@/app/_components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

export default function LoginForm() {
  const router = useRouter();
  const { control, password, onSubmit } = useLogin({
    onSuccess: () => {
      router.replace(`/${ROUTES.HOME}`);
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <AppInput
              label="Email"
              icon={<MailIcon className="icon-input" />}
              inputProps={{ placeholder: 'name@example.com' }}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <AppInput icon={<LockIcon className="icon-input" />} {...field} password />
            )}
          />

          {password.length > 0 && <PasswordStrength password={password} />}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>

        <Button type="submit" className="w-full">
          Sign in
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <SSOViaSocial type="signin" />
      </div>
    </div>
  );
}
