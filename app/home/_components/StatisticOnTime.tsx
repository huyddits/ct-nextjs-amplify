export default function StatisticOnTime({
  appellation,
  statistic,
  colorClass,
}: {
  appellation: string;
  statistic: { value: number; unit: string }[];
  colorClass: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-sm text-gray-600 mb-3">{appellation}</h2>
      <div className="grid grid-cols-2 gap-4">
        {statistic.map((item, index) => (
          <div key={index}>
            <div className={`text-3xl font-bold ${colorClass}`}>
              {item.value != null ? `${item.value}%` : ''}
            </div>
            <div className="text-xs text-gray-500">{item.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
