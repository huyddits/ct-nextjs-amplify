import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function StrengthPage() {
  return (
    <section>
      <div className="border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center space-x-6 overflow-x-auto py-3 scrollbar-hide">
            <button className="text-gray-500 whitespace-nowrap">Cheer Trainer</button>
            <button className="text-gray-500 whitespace-nowrap">Team Programs</button>
            <button className="text-[#257951] font-medium whitespace-nowrap">My Programs</button>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 pt-[20px] pb-[140px]">
        <Button className="w-full border-dashed " size="lg" variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Create New Program
        </Button>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 px-4 py-2 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto flex justify-center">
          <Button className="w-4/5 bg-[#257951] hover:bg-[#1e6040] h-10 text-sm font-medium rounded-lg">
            Past Strength Training
          </Button>
        </div>
      </div>
    </section>
  );
}
