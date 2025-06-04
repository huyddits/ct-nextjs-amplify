import React from 'react';
import { EquipmentFilter } from './EquipmentFilter';

export default function EquipmentFilterMockData() {
  const mockEquipmentOptions = [
    'Dumbbells',
    'Barbell',
    'Kettlebell',
    'Resistance Band',
    'Pull-up Bar',
    'Bodyweight',
    'Treadmill',
    'Rowing Machine',
  ];

  return (
    <div className="bg-gray-50">
      <EquipmentFilter equipmentOptions={mockEquipmentOptions} />
    </div>
  );
}
