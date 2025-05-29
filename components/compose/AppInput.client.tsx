'use client';
import React, { JSX, InputHTMLAttributes, useState, useMemo } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: string;
  icon?: JSX.Element;
  iconPosition?: 'start' | 'end';
  value?: string;
  required?: boolean;
  password?: boolean;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >;
  fullWidth?: boolean;
  errorMessage?: string;
  postfix?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AppInput({
  id,
  icon,
  label,
  value,
  postfix,
  required,
  password,
  fullWidth,
  inputProps,
  errorMessage,
  iconPosition,
  onChange,
  ...containerProps
}: Readonly<AppInputProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const inputType = useMemo(() => {
    let defaultType = 'text';
    if (password) {
      if (!showPassword) {
        defaultType = 'password';
      }
    } else if (inputProps?.type) {
      defaultType = inputProps.type;
    }
    return defaultType;
  }, [password, showPassword, inputProps?.type]);

  const iconPos = useMemo(() => {
    return iconPosition ?? 'start';
  }, [iconPosition]);

  const inputClasses = useMemo(() => {
    if (icon && iconPos === 'start') {
      return 'pl-10';
    }
    if (icon && iconPos === 'end') {
      return 'pr-10';
    }
    return 'pl-3';
  }, [icon, iconPos]);

  return (
    <div
      {...containerProps}
      className={cn('space-y-2', containerProps.className, fullWidth && 'w-full')}
    >
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <div className="relative flex items-stretch">
        {icon && iconPos === 'start' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={inputType}
          className={cn('bg-white', inputClasses, postfix && 'pr-20')}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
        {password && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="icon-input" />
            ) : (
              <EyeIcon className="icon-input" />
            )}
          </button>
        )}
        {postfix && typeof postfix === 'string' ? (
          <div className="absolute top-0 right-0 h-full bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-500 flex items-center px-3">
            {postfix}
          </div>
        ) : (
          postfix
        )}
        {icon && iconPos === 'end' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{icon}</div>
        )}
      </div>
      {errorMessage && (
        <div className="-mt-2">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
