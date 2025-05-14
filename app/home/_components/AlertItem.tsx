import { X } from 'lucide-react';

export default function AlertItem({
  title,
  content,
  colorClass,
  closable,
}: {
  title: string;
  content: { name: string; exercise: string; value: string }[]; // 'value' chứa due date
  colorClass: string;
  closable: boolean;
}) {
  return (
    <div className="mb-3">
      <div className="space-y-2">
        <div className={`text-sm font-medium text-${colorClass}-600 mb-2`}>{title}</div>

        {content.map((item, index) => (
          <div
            key={index}
            className={`relative bg-${colorClass}-50 p-3 rounded text-sm border-l-2 border-${colorClass}-500`}
          >
            {closable && (
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="font-semibold">{item.name}</div>
            <div className="text-gray-600">{item.exercise}</div>
            <div className={`text-xs text-${colorClass}-600 mt-1`}>Due: {item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
