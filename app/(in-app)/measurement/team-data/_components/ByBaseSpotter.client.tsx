'use client';
import SimpleTable from './SimpleTable.client';
export default function ByBaseSpotterContent() {
  const squatData = [
    { id: 1, name: 'Base Name', weight: '400 lb' },
    { id: 2, name: 'Base Name', weight: '400 lb' },
    { id: 3, name: 'Base Name', weight: '335 lb' },
    { id: 4, name: 'Base Name', weight: '225 lb' },
    { id: 5, name: 'Base Name', weight: '200 lb' },
    { id: 6, name: 'Base Name', weight: '200 lb' },
    { id: 7, name: 'Base Name', weight: '195 lb' },
    { id: 8, name: 'Base Name', weight: '185 lb' },
    { id: 9, name: 'Base Name', weight: '175 lb' },
    { id: 10, name: 'Base Name', weight: '165 lb' },
  ];

  const benchData = [
    { id: 1, name: 'Base Name', weight: '315 lb' },
    { id: 2, name: 'Base Name', weight: '285 lb' },
    { id: 3, name: 'Base Name', weight: '275 lb' },
    { id: 4, name: 'Base Name', weight: '225 lb' },
    { id: 5, name: 'Base Name', weight: '200 lb' },
    { id: 6, name: 'Base Name', weight: '200 lb' },
    { id: 7, name: 'Base Name', weight: '195 lb' },
    { id: 8, name: 'Base Name', weight: '185 lb' },
    { id: 9, name: 'Base Name', weight: '175 lb' },
    { id: 10, name: 'Base Name', weight: '165 lb' },
  ];
  return (
    <div className="my-2 mx-1">
      <h3 className="bg-primary text-white py-2 px-4 mt-4 font-medium mb-2 rounded">
        Top Performance
      </h3>
      <div className="mb-4">
        <SimpleTable
          title="Squat"
          listItems={squatData.map(item => ({
            id: item.id.toString(),
            name: item.name,
            value: item.weight,
          }))}
        />
      </div>

      <div className="mb-4">
        <SimpleTable
          title="Bench"
          listItems={benchData.map(item => ({
            id: item.id.toString(),
            name: item.name,
            value: item.weight,
          }))}
        />
      </div>
    </div>
  );
}
