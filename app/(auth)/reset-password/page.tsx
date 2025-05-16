'use client';

import { ROUTES } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserApi } from '@/api';
import { InferType, object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppInput } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';

const schema = object().shape({
  password: string()
    .required('Please enter your password')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .test('is-strong', 'Password is too weak', value => {
      if (!value) return false;
      const strength =
        (value.length >= 8 ? 1 : 0) +
        (/[A-Z]/.test(value) ? 1 : 0) +
        (/[a-z]/.test(value) ? 1 : 0) +
        (/\d/.test(value) ? 1 : 0) +
        (/[^A-Za-z0-9]/.test(value) ? 1 : 0);
      return strength >= 3; // Equivalent to 60%
    }),
  confirmPassword: string()
    .test('password-match', 'Passwords do not match', function (value) {
      const { password } = this.parent;
      return password === value;
    })
    .required('Please confirm your password'),
});

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  type FormPayload = InferType<typeof schema>;

  const onValid = async (data: FormPayload) => {
    console.log(data);
    if (!token) {
      toast.error('Invalid token');
      return;
    }
    try {
      const response = await UserApi.resetPassword({ new_password: data.password, token });
      if (response.data.status === 'success') {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  const onInvalid = (error: any) => {
    console.log(error);
  };

  return (
    <div>
      {isSuccess ? (
        <div className="flex flex-col items-center space-y-4 shadow p-5 justify-center rounded-xl">
          <CheckCircleIcon className="text-primary" size="100" />
          <h1 className="text-2xl">Password reset successfully</h1>
          <Button variant="link" asChild>
            <Link href={`/${ROUTES.LOGIN}`} className="text-center mb-10">
              Back to login
            </Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-center mb-10">Reset Password</h1>
          </div>

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => {
              return (
                <AppInput
                  label="New Password"
                  inputProps={{ placeholder: 'Enter your new password' }}
                  errorMessage={error?.message}
                  password
                  {...field}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => {
              return (
                <AppInput
                  label="Confirm Password"
                  inputProps={{
                    placeholder: 'Confirm your new password',
                  }}
                  errorMessage={error?.message}
                  password
                  {...field}
                />
              );
            }}
          />
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      )}
    </div>
  );
}
