'use client';

import React, { ComponentProps, JSX, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import { format as dateFnsFormat, formatDate, isValid, parseISO } from 'date-fns';

interface AppCalendarPickerProps {
  icon?: JSX.Element;
  label?: string | React.JSX.Element;
  value?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
  dateFormat?: string;
  triggerLabel?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (date?: Date) => void;
  variant?: ComponentProps<typeof Button>['variant'];
}

export default function AppCalendarPicker({
  icon = <CalendarIcon className="h-4 w-4" />,
  label,
  value,
  maxDate,
  fullWidth,
  dateFormat,
  triggerLabel,
  disabled,
  errorMessage,
  onChange,
  variant = 'outline',
}: Readonly<AppCalendarPickerProps>) {
  const format = dateFormat ?? DEFAULT_DATE_FORMAT;

  const displayedLabel = useMemo(() => {
    if (triggerLabel) return triggerLabel;
    if (value) return dateFnsFormat(value, format);
    return 'Select date';
  }, [triggerLabel, value]);

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={variant}
            className={cn(
              'w-full font-normal h-9 flex items-center',
              !value && 'text-muted-foreground',
              fullWidth && 'w-full',
              disabled && 'pointer-events-none opacity-100 cursor-default'
            )}
          >
            {icon && <span>{icon}</span>}
            {displayedLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={date => {
              onChange?.(date ?? undefined);
            }}
            initialFocus
            toDate={maxDate}
          />
        </PopoverContent>
      </Popover>
      {errorMessage && <span className="error-message text-sm text-red-500">{errorMessage}</span>}
    </div>
  );
}
