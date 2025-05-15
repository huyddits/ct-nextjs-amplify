'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import StrengthSection from './_components/StrengthSection';

export default function StrengthPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <section>
      <div className="border-b sticky top-9 z-50 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center space-x-6 overflow-x-auto py-3 ">
            <button className="text-gray-500 whitespace-nowrap">Cheer Trainer</button>
            <button className="text-gray-500 whitespace-nowrap">Team Programs</button>
            <button className="text-[#257951] font-medium whitespace-nowrap">My Programs</button>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mb-4 mx-auto px-4 pt-[60px] pb-[140px]">
        <Button className="w-full border-dashed border-2 " size="lg" variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Create New Program
        </Button>
        <div className="pt-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 h-10 bg-white"
              placeholder="Search programs..."
              type="search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="space-y-4">
            <StrengthSection />
          </div>
        </div>
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
