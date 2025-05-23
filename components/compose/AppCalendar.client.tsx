'use client';

import React, { JSX } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';

interface AppCalendarPickerProps {
  icon?: JSX.Element;
  label?: string | React.JSX.Element;
  value?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
  dateFormat?: string;
  triggerLabel?: string;
  errorMessage?: string;
  onChange?: (date?: Date) => void;
}

export default function AppCalendarPicker({
  icon = <CalendarIcon className="h-4 w-4" />,
  label,
  value,
  maxDate,
  fullWidth,
  dateFormat,
  triggerLabel,
  errorMessage,
  onChange,
}: Readonly<AppCalendarPickerProps>) {
  const format = dateFormat ?? DEFAULT_DATE_FORMAT;

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full font-normal h-9 flex items-center',
              !value && 'text-muted-foreground',
              icon && 'pl-10',
              fullWidth && 'w-full'
            )}
          >
            {icon && <span className="mr-2">{icon}</span>}
            {triggerLabel ?? dayjs(value).format(format)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={date => onChange?.(date ?? undefined)}
            initialFocus
            toDate={maxDate}
          />
        </PopoverContent>
      </Popover>
      {errorMessage && <span className="error-message text-sm text-red-500">{errorMessage}</span>}
    </div>
  );
}
