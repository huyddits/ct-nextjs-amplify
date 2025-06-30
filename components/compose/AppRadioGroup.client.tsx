'use client';
import React from 'react';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export type RadioOption = { label: string; value: string };
interface AppRadioGroupProps {
  label?: string;
  options: RadioOption[];
  layout?: 'horizontal' | 'vertical';
  errorMessage?: string;
  defaultSelected?: string;
  onChangeSelected: (value: string) => void;
  selected?: string;
}

export default function AppRadioGroup({
  label,
  layout,
  options,
  errorMessage,
  defaultSelected,
  onChangeSelected,
  selected,
}: AppRadioGroupProps) {
  return (
    <div className="space-y-2">
      {label && <Label className="text-base font-medium">{label}</Label>}
      <RadioGroup
        value={selected}
        defaultValue={defaultSelected}
        onValueChange={onChangeSelected}
        className={layout === 'vertical' ? 'flex-col space-y-2' : 'flex space-x-4'}
      >
        {options.map(item => (
          <div key={item.value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={item.value}
              value={item.value}
              aria-labelledby={`${item.value}-label`}
            />
            <Label id={`${item.value}-label`} htmlFor={item.value} className="cursor-pointer">
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {errorMessage && (
        <div className="-mt-2">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
