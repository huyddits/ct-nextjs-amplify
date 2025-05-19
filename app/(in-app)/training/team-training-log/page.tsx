export default function TeamTrainingLogPage() {
  const listItems = [
    { name: 'Emily Johnson', strength: '12d', cardio: '15d', minutes: '180min' },
    { name: 'John Smith', strength: '10d', cardio: '12d', minutes: '150min' },
    { name: 'Sarah Williams', strength: '14d', cardio: '10d', minutes: '165min' },
    { name: 'Michael Brown', strength: '8d', cardio: '16d', minutes: '200min' },
    { name: 'Jessica Davis', strength: '15d', cardio: '8d', minutes: '120min' },
    { name: 'David Miller', strength: '11d', cardio: '13d', minutes: '175min' },
    { name: 'Lisa Anderson', strength: '13d', cardio: '14d', minutes: '190min' },
    { name: 'Robert Wilson', strength: '9d', cardio: '11d', minutes: '145min' },
    { name: 'Amanda Taylor', strength: '16d', cardio: '9d', minutes: '135min' },
    { name: 'Kevin Martinez', strength: '12d', cardio: '12d', minutes: '160min' },
    { name: 'Rachel Thompson', strength: '10d', cardio: '15d', minutes: '185min' },
    { name: 'Daniel White', strength: '14d', cardio: '11d', minutes: '155min' },
    { name: 'Michelle Lee', strength: '11d', cardio: '14d', minutes: '170min' },
    { name: 'Christopher Clark', strength: '13d', cardio: '10d', minutes: '140min' },
    { name: 'Jennifer Garcia', strength: '15d', cardio: '13d', minutes: '195min' },
    { name: 'Steven Rodriguez', strength: '12d', cardio: '12d', minutes: '165min' },
  ];

  return (
    <div className="pt-[56px] pb-[80px]">
      <div className="max-w-3xl mx-auto overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
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
          </thead>
          <tbody>
            {listItems.map((athlete, index) => (
              <tr key={athlete.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4 border-b">{athlete.name}</td>
                <td className="text-center py-3 px-2 border-b">{athlete.strength}</td>
                <td className="text-center py-3 px-2 border-b text-primary">12d</td>
                <td className="text-center py-3 px-2 border-b">{athlete.cardio}</td>
                <td className="text-center py-3 px-2 border-b text-primary">12d</td>
                <td className="text-center py-3 px-2 border-b">{athlete.minutes}</td>
                <td className="text-center py-3 px-2 border-b text-primary">164min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
