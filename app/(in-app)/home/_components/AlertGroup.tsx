import { ReactNode } from 'react';

export default function AlertGroup({
  title,
  children,
  colorClass,
}: {
  title: string;
  children: ReactNode;
  colorClass: string;
}) {
  return (
    <div className="mb-3">
      <div className="space-y-2">
        <div className={`text-sm font-medium text-${colorClass}-600 mb-2`}>{title}</div>
        {children}
      </div>
    </div>
  );
}
