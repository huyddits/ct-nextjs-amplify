'use client';
import { FlyerAndBasesItem } from '../_types';
import SimpleTable from './SimpleTable.client';
export default function ByBaseSpotterContent({
  basesSpotterItem = [],
}: Readonly<{ basesSpotterItem?: FlyerAndBasesItem[] }>) {
  return (
    <div className="my-2 mx-1">
      <h3 className="bg-primary text-white py-2 px-4 mt-4 font-medium mb-2 rounded">
        Top Performance
      </h3>
      {basesSpotterItem.map(baseItem => (
        <div className="mb-4" key={baseItem.measurementName}>
          <SimpleTable
            title={baseItem.measurementName}
            listItems={baseItem.items.map((item, index) => ({
              id: (index + 1).toString(),
              name: item.name,
              value: `${item.result} ${item.unit}`,
            }))}
          />
        </div>
      ))}
    </div>
  );
}
