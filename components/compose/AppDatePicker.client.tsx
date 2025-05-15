'use client';
import React, { useEffect, useState, JSX } from 'react';
import DatePicker from 'react-datepicker';
import { Label } from '@/components/ui/label';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '@/lib/utils';

interface AppDatePickerProps {
  icon?: JSX.Element;
  label: string | React.JSX.Element;
  value: string;
  fullWidth?: boolean;
  dateFormat?: string;
  placeholder?: string;
  errorMessage?: string;
  onChange: (date: Date | null) => void;
}

export default function AppDatePicker({
  icon,
  label,
  value,
  fullWidth,
  dateFormat,
  placeholder,
  errorMessage,
  onChange,
}: Readonly<AppDatePickerProps>) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const format = dateFormat ?? DEFAULT_DATE_FORMAT;

  useEffect(() => {
    value ? setSelectedDate(dayjs(value, format).toDate()) : setSelectedDate(null);
  }, [value, format]);
  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && <Label>{label}</Label>}
      <div className="relative flex items-stretch">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          dateFormat={format}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            icon && 'pl-10'
          )}
          wrapperClassName={cn(fullWidth && 'w-full flex items-stretch')}
          placeholderText={placeholder}
        />
      </div>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
