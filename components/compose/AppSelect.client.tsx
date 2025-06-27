'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';

export type SelectOption = {
  label: string;
  value: string;
  unitType?: string;
  disabled?: boolean;
  [key: string]: any;
};

interface AppSelectProps {
  id?: string;
  label?: string | React.JSX.Element;
  required?: boolean;
  options: SelectOption[];
  selectedValue?: string;
  defaultLabel?: string;
  className?: string;
  fullWidth?: boolean;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  infinite?: () => void;
  fetchingMore?: boolean;
  onChangeSelected: (selectedValue: string) => void;
}

export default function AppSelect({
  id,
  label,
  options,
  required,
  disabled,
  className,
  fullWidth,
  placeholder,
  defaultLabel,
  errorMessage,
  selectedValue,
  onChangeSelected,
  loading,
  infinite,
  fetchingMore,
}: Readonly<AppSelectProps>) {
  const [isChanged, setIsChanged] = useState(false);
  const [observerElement, setObserverElement] = useState<HTMLDivElement | null>(null);
  const selectedLabel = defaultLabel ?? options.find(o => o.value === selectedValue)?.label ?? '';

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!infinite || !observerElement) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        infinite();
      }
    });

    observer.observe(observerElement);

    return () => {
      console.log('Disconnecting Intersection Observer');
      observer.disconnect();
    };
  }, [infinite, observerElement]);

  const onValueChange = useCallback(
    (value: string) => {
      onChangeSelected(value);
      setIsChanged(true);
    },
    [onChangeSelected]
  );
  return (
    <div className={cn('space-y-2', className)}>
      {label &&
        (label instanceof React.Component ? (
          label
        ) : (
          <Label id={id} className="text-gray-600">
            {label} {required && <span className="text-red-600">*</span>}
          </Label>
        ))}
      <Select value={selectedValue} onValueChange={onValueChange}>
        <SelectTrigger
          aria-labelledby={id}
          disabled={disabled}
          loading={loading}
          className={cn('bg-white', fullWidth ? 'w-full' : '')}
        >
          {!isChanged ? (
            <Input
              readOnly
              value={selectedLabel}
              className="border-none p-0 text-black"
              placeholder={placeholder}
              disabled={disabled}
            />
          ) : (
            <SelectValue placeholder={placeholder} aria-disabled={disabled} />
          )}
        </SelectTrigger>
        <SelectContent className="max-h-96">
          {options.length ? (
            <>
              {options.map(item => (
                <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </SelectItem>
              ))}
              {fetchingMore && (
                <div className="text-center text-sm py-2 text-gray-500">Loading more...</div>
              )}
              {infinite && <div ref={setObserverElement} className="h-1" aria-hidden="true" />}
            </>
          ) : (
            <div className="text-center text-sm py-1 text-gray-500">No data</div>
          )}
        </SelectContent>
      </Select>
      {errorMessage && (
        <div className="-mt-2">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
