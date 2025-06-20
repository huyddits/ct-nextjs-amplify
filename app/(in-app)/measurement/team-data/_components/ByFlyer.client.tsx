'use client';

import { useTeamData } from '../_hook';
import SimpleTable from './SimpleTable.client';

export default function ByFlyerContent() {
  const { flyer } = useTeamData();
  return (
    <div className="my-2 mx-1">
      <h3 className="bg-primary text-white py-2 px-4 mt-4 font-medium mb-2 rounded">
        Top Performance
      </h3>
      {flyer.map(flyerData => (
        <div className="mb-4" key={flyerData.measurementName}>
          <SimpleTable
            title={flyerData.measurementName}
            listItems={flyerData.items.map((item, index) => ({
              id: (index + 1).toString(),
              name: item.name,
              value: `${item.result} ${item.measurementUnit}`,
            }))}
          />
        </div>
      ))}
    </div>
  );
}
