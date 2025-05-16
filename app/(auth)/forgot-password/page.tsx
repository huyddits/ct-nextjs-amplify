'use client';
import { AppInput } from '@/components/compose';
import { yupResolver } from '@hookform/resolvers/yup';
import { MailIcon, CheckCircleIcon } from 'lucide-react';
import { createRef, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { object, string } from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { UserApi } from '@/api';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';

const schema = object().shape({
  email: string().email('Please enter a valid email').required(),
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
      setError('email', { message: 'Email is not valid!' });
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
      )}
    </div>
  );
}
