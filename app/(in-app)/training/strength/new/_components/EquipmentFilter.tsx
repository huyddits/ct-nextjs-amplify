import React, { useState } from 'react';
import { DumbbellIcon, Filter, ChevronUp, ChevronDown, X } from 'lucide-react';

export function EquipmentFilter({ equipmentOptions }: { equipmentOptions: string[] }) {
  const [equipmentFilterOpen, setEquipmentFilterOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
        <div className="bg-green-20 border-b p-4">
          <h2 className="text-base font-medium text-primary flex items-center">
            <DumbbellIcon className="h-5 w-5 mr-2" />
            Equipment Filter
          </h2>
          <p className="text-xs text-gray-600 mt-1 ml-7">Filter exercises by available equipment</p>
        </div>

        <div className="p-4">
          <button
            className="flex items-center justify-between w-full p-2 border border-gray-200 rounded-md bg-white text-left"
            onClick={() => setEquipmentFilterOpen(!equipmentFilterOpen)}
          >
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">Select equipment types</span>
              {selectedEquipment.length > 0 && (
                <span className="ml-2 px-2 py-0.5  text-primary rounded-full text-xs">
                  {selectedEquipment.length}
                </span>
              )}
            </div>
            {equipmentFilterOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {equipmentFilterOpen && (
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4 border-l-4 border-primary">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-primary">Select Equipment</h3>
            <button
              className="text-xs text-gray-600 hover:text-gray-700"
              onClick={() => setSelectedEquipment([])}
            >
              Clear All
            </button>
          </div>

          {selectedEquipment.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedEquipment.map(item => (
                <div
                  key={item}
                  className="flex items-center bg-green-20 text-primary px-2 py-1 rounded-full text-xs"
                >
                  <span>
                    {item as string}.charAt(0).toUpperCase() + {item as string}
                    .slice(1).replace(/-/g, " ")
                  </span>
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

          <div className="grid grid-cols-2 gap-2">
            {equipmentOptions.map(equipment => {
              const value = equipment.toLowerCase().replace(/[&\s-]+/g, '-');
              const isSelected = selectedEquipment.includes(value);

              const toggleSelection = () => {
                if (isSelected) {
                  setSelectedEquipment(selectedEquipment.filter(item => item !== value));
                } else {
                  setSelectedEquipment([...selectedEquipment, value]);
                }
              };

              return (
                <label
                  key={value}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded text-primary focus:ring-primary"
                    checked={isSelected}
                    onChange={toggleSelection}
                  />
                  <span className="text-sm">{equipment}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary"
              onClick={() => setEquipmentFilterOpen(false)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
