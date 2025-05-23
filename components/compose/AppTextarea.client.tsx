'use client';
import React, { JSX, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface AppTextareaProps {
  id?: string;
  label?: string;
  icon?: JSX.Element;
  value?: string;
  required?: boolean;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >;
  errorMessage?: string;
  postfix?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function AppTextarea({
  id,
  icon,
  label,
  value,
  postfix,
  required,
  textareaProps,
  errorMessage,
  onChange,
  containerProps,
}: Readonly<AppTextareaProps>) {
  return (
    <div {...containerProps} className={twMerge('space-y-2', containerProps?.className)}>
      {label && (
        <Label htmlFor={id} className="text-sm text-gray-600">
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-2 pointer-events-none">
            {icon}
          </div>
        )}
        <Textarea
          id={id}
          className={twMerge(icon ? 'pl-10' : 'pl-3', postfix ? 'pr-20' : '', 'w-full')}
          value={value}
          onChange={onChange}
          {...textareaProps}
        />
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
