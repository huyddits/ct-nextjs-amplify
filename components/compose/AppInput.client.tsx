'use client';
import React, { JSX, InputHTMLAttributes, useState, useMemo } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: string | JSX.Element;
  icon?: JSX.Element;
  iconPosition?: 'start' | 'end';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  password?: boolean;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onBlur' | 'name' | 'ref' | 'disabled' | 'readonly'
  >;
  fullWidth?: boolean;
  errorMessage?: string;
  postfix?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AppInput({
  id,
  icon,
  size = 'md',
  label,
  value,
  postfix,
  required,
  disabled,
  password,
  readonly,
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
    let classes = [];
    if (!icon) {
      classes.push('pl-3');
    }
    if (icon && iconPos === 'start') {
      classes.push('pl-10');
    }
    if (icon && iconPos === 'end') {
      classes.push('pr-10');
    }
    if (size === 'sm') {
      classes.push('py-1');
    }
    if (size === 'md') {
      classes.push('py-2');
    }
    if (size === 'lg') {
      classes.push('py-5');
    }

    return classes.join(' ');
  }, [icon, iconPos, size]);

  return (
    <div
      {...containerProps}
      className={cn('space-y-2', containerProps.className, fullWidth && 'w-full')}
    >
      {label && typeof label === 'string' && (
        <Label htmlFor={id} className="text-gray-600">
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      {label && typeof label === 'object' && label}
      <div className="relative flex items-stretch">
        {icon && iconPos === 'start' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={inputType}
          {...inputProps}
          readOnly={readonly}
          disabled={disabled}
          className={cn('bg-white', inputClasses, postfix && 'pr-20', inputProps?.className)}
          value={value}
          onChange={onChange}
          onKeyDown={e => {
            if (inputType === 'number' && (e.key === '-' || e.key === 'e')) {
              e.preventDefault();
            }
            inputProps?.onKeyDown?.(e);
          }}
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
          <div className="absolute top-0 right-0 h-full bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-500 flex items-center px-2">
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
