'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from '../ui/select';

export type SelectOption = {
  label: string;
  value: string;
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
  onChangeSelected: (selectedValue: string) => void;
}

export default function AppSelect({
  id,
  label,
  options,
  required,
  className,
  fullWidth,
  placeholder,
  defaultLabel,
  errorMessage,
  selectedValue,
  onChangeSelected,
}: Readonly<AppSelectProps>) {
  const [isChanged, setIsChanged] = useState(false);
  const selectedLabel = defaultLabel ?? options.find(o => o.value === selectedValue)?.label;

  const onValueChange = useCallback(
    (value: string) => {
      onChangeSelected(value);
      setIsChanged(true);
    },
    [onChangeSelected]
  );
  return (
    <div className={twMerge('space-y-2', className)}>
      {label &&
        (label instanceof React.Component ? (
          label
        ) : (
          <Label id={id}>
            {label} {required && <span className="text-red-600">*</span>}
          </Label>
        ))}
      <Select value={selectedValue} onValueChange={onValueChange}>
        <SelectTrigger aria-labelledby={id} className={fullWidth ? 'w-full' : ''}>
          {!isChanged ? (
            <Input
              readOnly
              value={selectedLabel}
              className="border-none p-0 text-black"
              placeholder={placeholder}
            />
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          {options.length ? (
            options.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
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
