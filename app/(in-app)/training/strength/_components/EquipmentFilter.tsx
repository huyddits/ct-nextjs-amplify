'use client';
import React, { useEffect, useState } from 'react';
import { DumbbellIcon, FilterIcon, ChevronUpIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { set } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

interface FilterTriggerProps {
  isOpen: boolean;
  selectedEquipments: Option[];
  onOpenChange: (isOpen: boolean) => void;
}

const FilterTrigger = ({ isOpen, selectedEquipments, onOpenChange }: FilterTriggerProps) => {
  return (
    <button
      className="flex items-center justify-between w-full p-2 border border-gray-200 rounded-md bg-white text-left"
      onClick={() => onOpenChange(!isOpen)}
    >
      <div className="flex items-center">
        <FilterIcon className="h-4 w-4 mr-2 text-primary" />
        <span className="text-sm">Select equipment types</span>
        {selectedEquipments.length > 0 && (
          <span className="ml-2 px-2 py-0.5 text-foreground rounded-full text-xs bg-green-50">
            {selectedEquipments.length}
          </span>
        )}
      </div>
      {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
    </button>
  );
};

const EquipmentOption = ({
  label,
  checked,
  onCheckedChange,
}: Readonly<{
  label: string;
  checked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
}>) => {
  return (
    <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
      <input
        type="checkbox"
        className="rounded text-primary focus:ring-primary"
        checked={checked}
        onChange={() => onCheckedChange(!checked)}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default function EquipmentFilter({
  className,
  equipmentOptions,
  onApplyFilter,
  onChangeEquipments,
}: Readonly<{
  className?: string;
  equipmentOptions: Option[];
  onApplyFilter?: () => void;
  onChangeEquipments: (value: Option[]) => void;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Option[]>([]);

  const isSelected = (item: Option) => {
    return selectedEquipment.some(selectedItem => selectedItem.value === item.value);
  };

  const onToggleSelection = (item: Option, isChecked: boolean) => {
    if (isChecked) {
      setSelectedEquipment(prevItems => [...prevItems, item]);
    } else {
      setSelectedEquipment(prevItems =>
        prevItems.filter(selectedItem => selectedItem.value !== item.value)
      );
    }
  };

  const onClearAll = () => {
    setSelectedEquipment([]);
  };

  const onCheckAll = () => {
    setSelectedEquipment(equipmentOptions);
  };

  useEffect(() => {
    onChangeEquipments(selectedEquipment);
  }, [selectedEquipment]);

  return (
    <div className={cn('bg-gray-50', className)}>
      <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
        <div className="bg-green-50 border-b p-4">
          <h2 className="text-base font-medium text-primary flex items-center">
            <DumbbellIcon className="h-5 w-5 mr-2" />
            Equipment Filter
          </h2>
          <p className="text-xs text-gray-600 mt-1 ml-7">Filter exercises by available equipment</p>
        </div>

        <div className="p-4">
          <FilterTrigger
            isOpen={isOpen}
            selectedEquipments={selectedEquipment}
            onOpenChange={open => setIsOpen(open)}
          />
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 p-0!',
          'bg-white rounded-lg shadow-sm mb-4 border-l-4 border-primary p-4'
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-primary">Select Equipment</h3>
          <div className="space-x-2">
            <Button variant="ghost" size="sm" onClick={onCheckAll}>
              Check All
            </Button>
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {selectedEquipment.length.toString() && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedEquipment.map(item => (
              <div
                key={item.value}
                className="flex items-center bg-green-20 text-primary px-2 py-1 rounded-full text-xs"
              >
                <span>{item.label}</span>
                <button
                  className="ml-1"
                  onClick={() => setSelectedEquipment(selectedEquipment.filter(i => i !== item))}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {equipmentOptions.map(item => (
            <EquipmentOption
              key={item.value}
              checked={isSelected(item)}
              label={item.label}
              onCheckedChange={isChecked => onToggleSelection(item, isChecked)}
            />
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => {
          onApplyFilter?.();
          setIsOpen(false);
        }}
      >
        Apply Filter
      </Button>
    </div>
  );
}
