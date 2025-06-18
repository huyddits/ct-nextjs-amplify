import React from 'react';

function calculateMonthlyAverage(weeks: string[]) {
  const numbers = weeks.map(w => parseInt(w.replace('%', '')));
  const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  return `${Math.round(avg)}%`;
}

export function ReferenceData() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#257951] text-white">
            <th className="sticky left-0 z-10 bg-[#257951] py-2 px-4 text-left font-medium min-w-[120px]">
              Name
            </th>
            <th className="py-2 px-4 text-left font-medium min-w-[100px]">Month</th>
            <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 1</th>
            <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 2</th>
            <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 3</th>
            <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 4</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Brittney M', weeks: ['100%', '75%', '100%', '50%'] },
            { name: 'Chaz J', weeks: ['50%', '50%', '100%', '100%'] },
            { name: 'Nick L', weeks: ['66%', '100%', '33%', '66%'] },
            { name: 'Ross R', weeks: ['0%', '25%', '0%', '25%'] },
            { name: 'Steve R', weeks: ['100%', '75%', '100%', '100%'] },
            { name: 'Tori P', weeks: ['100%', '100%', '100%', '100%'] },
            { name: 'Athlete A', weeks: ['100%', '75%', '100%', '50%'] },
            { name: 'Athlete B', weeks: ['50%', '50%', '100%', '100%'] },
            { name: 'Athlete C', weeks: ['100%', '75%', '100%', '50%'] },
            { name: 'Athlete D', weeks: ['100%', '75%', '100%', '50%'] },
            { name: 'Athlete E', weeks: ['50%', '50%', '100%', '100%'] },
            { name: 'Athlete F', weeks: ['100%', '75%', '100%', '100%'] },
            { name: 'Athlete G', weeks: ['66%', '100%', '33%', '66%'] },
            { name: 'Athlete H', weeks: ['0%', '25%', '0%', '25%'] },
            { name: 'Athlete I', weeks: ['100%', '75%', '100%', '100%'] },
            { name: 'Athlete J', weeks: ['100%', '100%', '100%', '100%'] },
          ].map((athlete, index) => (
            <tr key={athlete.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td
                className={`sticky left-0 z-10 py-2 px-4 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
              >
                {athlete.name}
              </td>
              <td className="py-2 px-4 border-b font-medium">
                {calculateMonthlyAverage(athlete.weeks)}
              </td>
              {athlete.weeks.map((week, weekIndex) => (
                <td key={weekIndex} className="py-2 px-4 border-b">
                  {week}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
