'use client';
import React, { useEffect, useState, JSX } from 'react';
import DatePicker from 'react-datepicker';
import { Label } from '@/components/ui/label';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import { cn } from '@/lib/utils';

interface AppDatePickerProps {
  icon?: JSX.Element;
  label: string | React.JSX.Element;
  value: string;
  maxDate?: Date;
  minDate?: Date;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  dateFormat?: string;
  inputFormat?: string;
  placeholder?: string;
  errorMessage?: string;
  onBlur?: () => void;
  onChange: (date: Date | null) => void;
}

export default function AppDatePicker({
  icon,
  label,
  value,
  maxDate,
  minDate,
  disabled,
  required,
  fullWidth,
  dateFormat,
  inputFormat,
  placeholder,
  errorMessage,
  onBlur,
  onChange,
}: Readonly<AppDatePickerProps>) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const format = inputFormat ?? DEFAULT_DATE_FORMAT;

  useEffect(() => {
    value ? setSelectedDate(dayjs(value, format).toDate()) : setSelectedDate(null);
  }, [value, format]);
  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && (
        <Label className="text-gray-600">
          {label} {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <div className="relative flex items-stretch">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <DatePicker
          selected={selectedDate}
          dateFormat={dateFormat}
          placeholderText={placeholder}
          maxDate={maxDate}
          minDate={minDate}
          wrapperClassName={cn(fullWidth && 'w-full flex items-stretch')}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-600 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            icon && 'pl-10'
          )}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      {errorMessage && (
        <div className="-mt-2">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
