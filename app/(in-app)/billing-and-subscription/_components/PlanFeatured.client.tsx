'use client';
import { CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';

interface PlanFeaturedProps {
  listItems: string[];
}

export default function PlanFeatured({ listItems }: PlanFeaturedProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-sm text-gray-600 mb-3">Plan Features</h2>
      <div className="space-y-2">
        {listItems.map(item => (
          <div key={item} className="flex items-center">
            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
