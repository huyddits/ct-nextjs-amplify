import { X } from 'lucide-react';
export default function AppAlert({
  name,
  content,
  value,
  colorClass,
  closable,
}: {
  name: string;
  content: string;
  value: string;
  colorClass: string;
  closable: boolean;
}) {
  return (
    <div
      className={`relative bg-${colorClass}-50 p-3 rounded text-sm border-l-2 border-${colorClass}-500`}
    >
      {closable && (
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-700 transition-colors">
          <X className="h-4 w-4" />
        </button>
      )}
      <div className="font-medium break-words">{name}</div>
      <div className="text-gray-600 break-words">{content}</div>
      <div className={`text-xs text-${colorClass}-600 mt-1 break-words`}>{value}</div>
    </div>
  );
}
