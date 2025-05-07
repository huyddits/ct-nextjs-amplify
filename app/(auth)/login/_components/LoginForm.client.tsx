'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MailIcon, LockIcon, ChevronRightIcon } from 'lucide-react';
import { Icon } from '@iconify/react';
import { object, string } from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppInput } from '@/components/compose';

const schema = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export default function LoginForm() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  // Calculate password strength
  const password = useWatch({ control, name: 'password', defaultValue: '' });

  useEffect(() => {
    console.log({ password });
    if (!password) {
      setPasswordStrength(0);
      setStrengthText('');
      return;
    }

    // Calculate strength based on various criteria
    let strength = 0;
    let checks = 0;

    // Check length
    if (password.length >= 8) {
      strength += 25;
      checks++;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strength += 25;
      checks++;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      strength += 25;
      checks++;
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
      strength += 25;
      checks++;
    }

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25;
      checks++;
    }
    console.log(checks);
    // Normalize strength to 100
    strength = Math.min(100, Math.floor(strength));

    // Set strength text based on score
    if (strength < 30) {
      setStrengthText('Weak');
    } else if (strength < 60) {
      setStrengthText('Medium');
    } else if (strength < 80) {
      setStrengthText('Strong');
    } else {
      setStrengthText('Very Strong');
    }

    setPasswordStrength(strength);
  }, [password]);

  // Get color based on strength
  const getStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    if (passwordStrength < 80) return 'bg-green-400';
    return 'bg-green-600';
  };

  const onSuccess = () => {};
  const onError = () => {};

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit(onSuccess, onError)} className="space-y-4">
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

          {/* TODO: Split this into another component */}
          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Password strength:</span>
                <span
                  className={`text-xs font-medium ${
                    passwordStrength < 30
                      ? 'text-red-500'
                      : passwordStrength < 60
                        ? 'text-yellow-500'
                        : passwordStrength < 80
                          ? 'text-green-400'
                          : 'text-green-600'
                  }`}
                >
                  {strengthText}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                  style={{ width: `${passwordStrength}%` }}
                  role="progressbar"
                  aria-valuenow={passwordStrength}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {passwordStrength < 60 && (
                  <ul className="list-disc list-inside space-y-0.5">
                    {password.length < 8 && <li>Use at least 8 characters</li>}
                    {!/[A-Z]/.test(password) && <li>Include uppercase letters</li>}
                    {!/[a-z]/.test(password) && <li>Include lowercase letters</li>}
                    {!/[0-9]/.test(password) && <li>Include numbers</li>}
                    {!/[^A-Za-z0-9]/.test(password) && <li>Include special characters</li>}
                  </ul>
                )}
              </div>
            </div>
          )}
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
      </div>
    </div>
  );
}
