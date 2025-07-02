import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useRole } from '@/hooks/useRole';
import { useMemo } from 'react';
export default function AppAlert({
  name,
  content,
  value,
  colorClass,
  closable,
  onDelete,
}: {
  name: string;
  content: string;
  value: string;
  colorClass: string;
  closable: boolean;
  onDelete?: () => void;
}) {
  const { isCoach } = useRole();
  const color = useMemo(() => {
    switch (colorClass) {
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-500',
          text: 'text-red-600',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500',
          text: 'text-yellow-600',
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-500',
          text: 'text-green-600',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          text: 'text-blue-600',
        };
    }
  });
  return (
    <div className={`relative ${color.bg} p-3 rounded text-sm border-l-2 ${color.border} pr-9`}>
      {closable && onDelete && (
        <Button
          onClick={onDelete}
          className={`absolute top-1 right-1 ${color.text}`}
          variant="link"
          size="icon"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {isCoach && <div className="font-medium break-words">{name}</div>}
      <div className="text-gray-600 break-words">{content}</div>
      <div className={`text-xs ${color.text} mt-1 break-words`}>{value}</div>
    </div>
  );
}
