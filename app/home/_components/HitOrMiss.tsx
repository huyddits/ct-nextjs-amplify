export default function HitOrMiss() {
  const stats = [
    { label: 'Weekly', value: '75%' },
    { label: 'Total', value: '78%' },
  ];
  return (
    <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 className="text-sm text-gray-600 mb-3 flex items-center">Hit/Miss</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(item => (
            <div key={item.label}>
              <div className="text-3xl font-bold text-orange-600">{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
