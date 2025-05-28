'use client';
import { AppInput } from '@/components/compose';
import { yupResolver } from '@hookform/resolvers/yup';
import { MailIcon, CheckCircleIcon } from 'lucide-react';
import React, { createRef, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { object, string } from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { UserApi } from '@/api';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { FooterSection, LogoSection } from '../_components';
import * as $v from '@/utils/validators';
const schema = object().shape({
  email: string()
    .required(ERROR_MESSAGES.INPUT)
    .matches($v.PATTERN.EMAIL, 'Please enter a valid email address (example: name@domain.com).')
    .max(100, 'Email cannot exceed 100 characters'),
});

export default function ForgotPasswordPage() {
  const recaptchaRef = createRef<ReCAPTCHA>();
  const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    control,
    formState: { isValid },
    setError,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const email = useWatch({ control, name: 'email' });

  const onForgotPassword = async () => {
    if (!reCaptchaToken) {
      toast.error('Please verify you are not a robot');
      return;
    }
    try {
      const response = await UserApi.forgotPassword({ email, captcha: reCaptchaToken });

      console.log(response.data.data?.token, reCaptchaToken);
      toast.success('Please check your email to reset your password.');
      setIsSuccess(true);
    } catch (error) {
      setError('email', { message: `The email doesn't exist.` });
      console.log(error);

      setTimeout(() => {
        recaptchaRef.current?.reset();
      }, 1000);
    }
  };

  const onChange = (token: string | null) => {
    console.log('onChange reCaptchaToken', token);
    if (token) {
      setReCaptchaToken(token);
    } else {
      setReCaptchaToken(null);
    }
  };

  return (
    <div>
      {isSuccess ? (
        <div className="flex flex-col items-center space-y-4 shadow p-5 justify-center rounded-xl">
          <CheckCircleIcon className="text-primary" size="100" />
          <div className="flex items-center gap-5">
            <h1 className="text-center text-2xl font-bold">Request reset password has been sent</h1>
          </div>
          <p>Please check your email to reset your password.</p>
          <div className="text-center mt-8">
            <Button variant="link" asChild>
              <Link href={`/${ROUTES.WELCOME}`} className="">
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <LogoSection description="Enter your email address and follow the instructions provided in the email" />
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <AppInput
                      label="Email"
                      icon={<MailIcon className="icon-input" />}
                      inputProps={{ placeholder: 'name@example.com' }}
                      errorMessage={error?.message}
                      {...field}
                    />
                  );
                }}
              />
              <div className="mx-auto w-fit">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string}
                  onChange={onChange}
                />
              </div>
              <Button
                onClick={onForgotPassword}
                className="w-full"
                disabled={!isValid || !reCaptchaToken}
              >
                Submit
              </Button>
            </div>
          </div>

          <div>
            <p className="text-center mt-8">
              <Link
                href={`/${ROUTES.WELCOME}`}
                className="text-primary font-medium hover:underline"
              >
                Back to home
              </Link>
            </p>
          </div>
        </React.Fragment>
      )}

      <FooterSection />
    </div>
  );
}
