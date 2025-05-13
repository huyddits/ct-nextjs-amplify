export default function StatisticOnTime({
  appellation,
  statistic,
  colorClass,
}: {
  appellation: string;
  statistic: { title: string; value: number; unit: string }[];
  colorClass: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-sm text-gray-600 mb-3">{appellation}</h2>
      <div className="grid grid-cols-3 gap-4">
        {statistic.map((item, index) => (
          <div key={index}>
            <div className="text-sm font-medium text-gray-700 min-h-[20px]">{item.title}</div>
            <div className={`text-2xl font-bold ${colorClass} min-h-[36px]`}>
              {item.value != null ? `${item.value}%` : ''}
            </div>
            <div className="text-xs text-gray-500 min-h-[20px]">{item.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
