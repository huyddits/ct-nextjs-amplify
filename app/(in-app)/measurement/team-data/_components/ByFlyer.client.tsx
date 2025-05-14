'use client';

import SimpleTable from './SimpleTable.client';

export default function ByFlyerContent() {
  const mockFlyersSquat = [
    { id: 'f1', name: 'Emily Johnson', weight: '205 lb' },
    { id: 'f2', name: 'Sarah Kim', weight: '205 lb' },
    { id: 'f3', name: 'Lily Nguyen', weight: '115 lb' },
    { id: 'f4', name: 'Chloe Park', weight: '100 lb' },
    { id: 'f5', name: 'Ava Smith', weight: '100 lb' },
    { id: 'f6', name: 'Mia Chen', weight: '100 lb' },
    { id: 'f7', name: 'Zoe Lee', weight: '95 lb' },
    { id: 'f8', name: 'Nora Davis', weight: '75 lb' },
    { id: 'f9', name: 'Grace Hill', weight: '75 lb' },
    { id: 'f10', name: 'Olivia Brown', weight: '75 lb' },
  ];

  const mockFlyersBench = [
    { id: 'f1', name: 'Emily Johnson', weight: '205 lb' },
    { id: 'f2', name: 'Sarah Kim', weight: '205 lb' },
    { id: 'f3', name: 'Lily Nguyen', weight: '115 lb' },
    { id: 'f4', name: 'Chloe Park', weight: '100 lb' },
    { id: 'f5', name: 'Ava Smith', weight: '100 lb' },
    { id: 'f6', name: 'Mia Chen', weight: '100 lb' },
    { id: 'f7', name: 'Zoe Lee', weight: '95 lb' },
    { id: 'f8', name: 'Nora Davis', weight: '75 lb' },
    { id: 'f9', name: 'Grace Hill', weight: '75 lb' },
    { id: 'f10', name: 'Olivia Brown', weight: '75 lb' },
  ];

  const mockShoulderPress = [
    { id: 'f1', name: 'Emily Johnson', weight: '205 lb' },
    { id: 'f2', name: 'Sarah Kim', weight: '205 lb' },
    { id: 'f3', name: 'Lily Nguyen', weight: '115 lb' },
    { id: 'f4', name: 'Chloe Park', weight: '100 lb' },
  ];

  const mockMileRunTime = [
    { id: 'f1', name: 'Emily Johnson', time: '6:00' },
    { id: 'f2', name: 'Sarah Kim', time: '6:01' },
    { id: 'f3', name: 'Lily Nguyen', time: '6:05' },
  ];
  return (
    <div className="my-2 mx-1">
      <h3 className="bg-primary text-white py-2 px-4 mt-4 font-medium mb-2 rounded">
        Top Performance
      </h3>

      <div className="mb-4">
        <SimpleTable
          title="Squat"
          listItems={mockFlyersSquat.map(item => ({
            id: item.id,
            name: item.name,
            value: item.weight,
          }))}
        />
      </div>

      <div className="mb-4">
        <SimpleTable
          title="Bench"
          listItems={mockFlyersBench.map(item => ({
            id: item.id,
            name: item.name,
            value: item.weight,
          }))}
        />
      </div>

      <div className="mb-4">
        <SimpleTable
          title="Shoulder Press"
          listItems={mockShoulderPress.map(item => ({
            id: item.id,
            name: item.name,
            value: item.weight,
          }))}
        />
      </div>

      <div className="mb-4">
        <SimpleTable
          title="1 Mile run time"
          listItems={mockMileRunTime.map(item => ({
            id: item.id,
            name: item.name,
            value: item.time,
          }))}
        />
      </div>

      <div className="mb-4">
        <SimpleTable
          title="2 Mile run time"
          listItems={mockMileRunTime.map(item => ({
            id: item.id,
            name: item.name,
            value: item.time,
          }))}
        />
      </div>
    </div>
  );
}
