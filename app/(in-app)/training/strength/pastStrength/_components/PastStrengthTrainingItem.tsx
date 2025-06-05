import { ReactNode } from 'react';

export default function PastStrengthTrainingItem({
  title,
  date,
  children,
}: Readonly<{
  title: string;
  date: string;
  children: ReactNode;
}>) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      {children}
    </div>
  );
}
