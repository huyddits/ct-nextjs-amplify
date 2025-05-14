'use client';
export default function ByFlyerContent() {
  const mockFlyers = [
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

  return (
    <div className="my-2 mx-1">
      <h3 className="bg-primary text-white py-2 px-4 font-medium mb-2 rounded">Top Performance</h3>

      <div className="mb-4">
        <div className="bg-white rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="bg-primary/10 py-2 px-4 font-medium text-left" colSpan={3}>
                  <div>Squat</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {mockFlyers.map((flyer, i) => (
                <tr key={flyer.id} className="border-b border-gray-100">
                  <td className="py-2 px-4 w-10 text-center">{i + 1}</td>
                  <td className="py-2">{flyer.name}</td>
                  <td className="py-2 px-4 text-right">{flyer.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-white rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="bg-primary/10 py-2 px-4 font-medium text-left" colSpan={3}>
                  <div>Bench</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {mockFlyers.map((flyer, i) => (
                <tr key={flyer.id} className="border-b border-gray-100">
                  <td className="py-2 px-4 w-10 text-center">{i + 1}</td>
                  <td className="py-2">{flyer.name}</td>
                  <td className="py-2 px-4 text-right">{flyer.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
