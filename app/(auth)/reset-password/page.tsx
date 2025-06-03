'use client';

import React, { useState } from 'react';
import { ERROR_MESSAGES, ROUTES } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';
import { UserApi } from '@/api';
import { InferType, object, ref, string } from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppInput } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { FooterSection, LogoSection, PasswordStrength } from '../_components';
import * as $v from '@/utils/validators';
import { useLoading } from '@/hooks';

const schema = object().shape({
  password: string()
    .required(ERROR_MESSAGES.INPUT)
    .min(8, 'Password must be at least 8 characters')
    .matches($v.PATTERN.LOWERCASE, 'Password must contain at least one lowercase letter')
    .matches($v.PATTERN.UPPERCASE, 'Password must contain at least one uppercase letter')
    .matches($v.PATTERN.NUMBER, 'Password must contain at least one number')
    .matches($v.PATTERN.SPECIAL_CHAR, 'Password must contain at least one special character')
    .max(100, 'Password cannot exceed 100 characters'),
  confirmPassword: string()
    .required(ERROR_MESSAGES.INPUT)
    .oneOf(
      [ref('password')],
      'Passwords do not match. Please make sure both entries are identical.'
    ),
});

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isSuccess, setIsSuccess] = useState(false);
  const { loading, startLoading, stopLoading } = useLoading();

  const { control, handleSubmit, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  type FormPayload = InferType<typeof schema>;

  const password = useWatch({ control, name: 'password' });

  const onValid = async (data: FormPayload) => {
    console.log(data);
    if (!token) {
      toast.error('Invalid token');
      return;
    }
    try {
      startLoading();
      const response = await UserApi.resetPassword({ new_password: data.password, token });
      if (response.data.status === 'success') {
        setIsSuccess(true);
      } else {
        console.log(response.data?.error);
      }
    } catch (error: any) {
      console.log(error);
      setIsSuccess(false);
      // TODO(ducnm): need to recheck when api is ready
      if (error?.response?.data?.message === 'jwt expired') {
        toast.error('Your reset password link has been expired. Please request a new one.');
      }
    } finally {
      stopLoading();
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

          <Link
            href={`/${ROUTES.LOGIN}`}
            className="text-center mb-10 text-primary font-medium hover:underline"
          >
            Back to login
          </Link>
        </div>
      ) : (
        <React.Fragment>
          <LogoSection description="Reset your password" />
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-8">
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <AppInput
                      label="New Password"
                      inputProps={{ placeholder: 'Enter your new password' }}
                      errorMessage={error?.type === 'required' ? error.message : undefined}
                      password
                      {...field}
                      onBlur={() => trigger('password')}
                    />
                  );
                }}
              />

              <PasswordStrength password={password} />

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
                      onBlur={() => trigger('confirmPassword')}
                    />
                  );
                }}
              />
              <Button type="submit" className="w-full" loading={loading}>
                Reset Password
              </Button>
            </form>
          </div>
          <div className="text-center mt-8">
            <Link href={`/${ROUTES.LOGIN}`} className="text-primary font-medium hover:underline">
              Back to Login
            </Link>
          </div>
        </React.Fragment>
      )}
      <FooterSection />
    </div>
  );
}
