export default function TableHeader() {
  return (
    <>
      <tr className="border-b">
        <th className="text-left py-2 px-4 font-medium text-gray-600">Athlete</th>
        <th colSpan={2} className="text-center py-2 px-4 font-medium text-gray-600">
          Strength Training
        </th>
        <th colSpan={2} className="text-center py-2 px-4 font-medium text-gray-600">
          Cardio Training
        </th>
        <th colSpan={2} className="text-center py-2 px-4 font-medium text-gray-600">
          Weekly Cardio
        </th>
      </tr>
      <tr className="border-b text-sm">
        <th className="text-left py-2 px-4 font-normal text-gray-600"></th>
        <th className="text-center py-2 px-2 font-normal text-gray-600">Days</th>
        <th className="text-center py-2 px-2 font-normal text-gray-600">Team Avg</th>
        <th className="text-center py-2 px-2 font-normal text-gray-600">Days</th>
        <th className="text-center py-2 px-2 font-normal text-gray-600">Team Avg</th>
        <th className="text-center py-2 px-2 font-normal text-gray-600">Minutes</th>
        <th className="text-center py-2 px-2 font-normal text-gray-600">Team Avg</th>
      </tr>
    </>
  );
}
