'use client';
import React, { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type CheckedState } from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

type MultipleSelectOption = {
  label: string;
  value: string;
};

interface AppMultipleSelectProps {
  label: string;
  options: MultipleSelectOption[];
  required?: boolean;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  selectedValues: string[];
  onChangeSelected: (values: string[]) => void;
}

export default function AppMultipleSelect({
  label,
  options,
  required,
  className,
  placeholder,
  errorMessage,
  selectedValues,
  onChangeSelected,
}: Readonly<AppMultipleSelectProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabels = useMemo(
    () =>
      options
        .filter(({ value }) => selectedValues.includes(value))
        .map(({ label }) => label)
        .join(', '),
    [selectedValues, options]
  );

  const onCheckedChange = (isChecked: CheckedState, value: string) => {
    if (isChecked === 'indeterminate' || !isChecked) {
      onChangeSelected(selectedValues.filter(item => item !== value));
    } else {
      onChangeSelected([...selectedValues, value]);
    }
  };

  return (
    <div className={cn('space-y-2 relative', className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="relative shadow-xs">
            <Input
              placeholder={placeholder}
              value={selectedLabels}
              className="text-left cursor-pointer truncate overflow-hidden whitespace-nowrap"
              readOnly
            />
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none opacity-50" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-3 max-h-56 overflow-y-auto w-[var(--radix-dropdown-menu-trigger-width)]">
          {options.map(item => (
            <div key={item.value} className="flex space-x-4 px-2">
              <Label className="text-md font-light">
                <Checkbox
                  checked={selectedValues.includes(item.value)}
                  onCheckedChange={checked => onCheckedChange(checked, item.value)}
                />
                {item.label}
              </Label>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
