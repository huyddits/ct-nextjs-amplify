import { useState } from 'react';
import { X } from 'lucide-react'; // hoặc thay bằng icon bạn dùng

interface EquipmentFilterPanelProps {
  equipmentOptions: string[];
  selectedEquipment: string[];
  setSelectedEquipment: (items: string[]) => void;
  setEquipmentFilterOpen: (open: boolean) => void;
}

export default function EquipmentFilterPanel({
  equipmentOptions,
  selectedEquipment,
  setSelectedEquipment,
  setEquipmentFilterOpen,
}: EquipmentFilterPanelProps) {
  const handleToggle = (value: string) => {
    if (selectedEquipment.includes(value)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== value));
    } else {
      setSelectedEquipment([...selectedEquipment, value]);
    }
  };

  const handleClearAll = () => setSelectedEquipment([]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4 border-l-4 border-[#257951]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-[#257951]">Select Equipment</h3>
        <button className="text-xs text-gray-500 hover:text-gray-700" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {/* Selected Tags */}
      {selectedEquipment.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedEquipment.map(item => (
            <div
              key={item}
              className="flex items-center bg-[#e6f0eb] text-[#257951] px-2 py-1 rounded-full text-xs"
            >
              <span>{item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' ')}</span>
              <button
                className="ml-1"
                onClick={() => setSelectedEquipment(selectedEquipment.filter(i => i !== item))}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Equipment Grid */}
      <div className="grid grid-cols-2 gap-2">
        {equipmentOptions.map(equipment => {
          const value = equipment.toLowerCase().replace(/[&\s-]+/g, '-');
          const isSelected = selectedEquipment.includes(value);

          return (
            <label
              key={value}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded text-[#257951] focus:ring-[#257951]"
                checked={isSelected}
                onChange={() => handleToggle(value)}
              />
              <span className="text-sm">{equipment}</span>
            </label>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-end">
        <button
          className="bg-[#257951] text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => setEquipmentFilterOpen(false)}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
