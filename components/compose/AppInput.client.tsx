'use client';
import React, { JSX, InputHTMLAttributes, useState, useMemo } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { twMerge } from 'tailwind-merge';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface AppInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: string;
  icon?: JSX.Element;
  value?: string;
  required?: boolean;
  password?: boolean;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >;
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
  inputProps,
  errorMessage,
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

  return (
    <div {...containerProps} className={twMerge('space-y-2', containerProps.className)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <div className="relative flex items-stretch">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={inputType}
          className={twMerge(icon ? 'pl-10' : 'pl-3', postfix && 'pr-20')}
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
      </div>
      {errorMessage && (
        <div className="-mt-2">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
