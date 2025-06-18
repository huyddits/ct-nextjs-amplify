'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { RefreshCw, Undo2 } from 'lucide-react';
import { useState } from 'react';

export default function ReportPage() {
  const [selectedRoutine, setSelectedRoutine] = useState('');
  type Attempt = {
    type: 'hit' | 'miss';
  };

  type Stunt = {
    id: string;
    name: string;
    group: string;
    members: string[];
    attempts: Attempt[];
  };
  const [stunts, setStunts] = useState<Stunt[]>([
    {
      id: '1',
      name: 'Toss to Hands',
      group: 'Group A',
      members: ['Alice', 'Bob', 'Charlie'],
      attempts: [],
    },
    {
      id: '2',
      name: 'Extension',
      group: 'Group B',
      members: ['David', 'Emma', 'Frank'],
      attempts: [],
    },
  ]);

  const handleRoutineSelect = (value: string) => {
    setSelectedRoutine(value);
  };

  const handleHitMiss = (id: string, type: 'hit' | 'miss') => {
    setStunts(prev =>
      prev.map(s => (s.id === id ? { ...s, attempts: [...s.attempts, { type }] } : s))
    );
  };

  const undoLastAttempt = (id: string) => {
    setStunts(prev =>
      prev.map(s => (s.id === id ? { ...s, attempts: s.attempts.slice(0, -1) } : s))
    );
  };

  const resetAll = () => {
    setStunts(prev => prev.map(s => ({ ...s, attempts: [] })));
  };

  const calculateHitPercentage = (attempts: { type: string }[]) => {
    const total = attempts.length;
    const hits = attempts.filter(a => a.type === 'hit').length;
    return total === 0 ? 0 : Math.round((hits / total) * 100);
  };

  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <div className="mt-4 space-y-4">
        <div>
          <Select value={selectedRoutine} onValueChange={handleRoutineSelect}>
            <SelectTrigger className="w-full border-2 rounded-md h-12">
              <SelectValue placeholder="Choose Routine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="routine1">Competition Routine 2024</SelectItem>
              <SelectItem value="routine2">Practice Routine A</SelectItem>
              <SelectItem value="routine3">Exhibition Routine Spring</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {stunts.map(stunt => (
            <Card
              key={stunt.id}
              className="rounded-2xl overflow-hidden bg-gradient-to-b from-green-50 to-green-100 border-2 w-full"
            >
              <div className="p-4">
                <div className="space-y-3">
                  <div className="pb-2 border-b border-gray-200">
                    <p className="text-lg font-semibold text-gray-900">
                      {stunt.name.split(' - ')[0]}
                    </p>
                  </div>
                  <div className="pb-2">
                    <p className="text-md font-medium text-gray-700">{stunt.group}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-medium text-gray-700">Athletes: </span>
                      {stunt.members.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {stunt.attempts.map((attempt, index) => (
                        <div
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full ${
                            attempt.type === 'hit' ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        />
                      ))}
                    </div>
                    {stunt.attempts.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                        onClick={() => undoLastAttempt(stunt.id)}
                      >
                        <Undo2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {stunt.attempts.length > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-gray-600 font-medium">
                        Reps: {stunt.attempts.length}
                      </div>
                      <div className="text-sm font-semibold">
                        {calculateHitPercentage(stunt.attempts)}% Hit
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    className="w-[45%] h-14 rounded-xl transition-all duration-200 bg-gradient-to-b from-green-500 to-green-600 hover:scale-102 border-green-700 text-white font-bold text-xl border-2 active:bg-green-800 active:scale-95"
                    onClick={() => handleHitMiss(stunt.id, 'hit')}
                  >
                    HIT
                  </Button>
                  <Button
                    className="w-[45%] h-14 rounded-xl transition-all duration-200 bg-gradient-to-b from-red-500 to-red-600 hover:scale-102 border-red-700 text-white font-bold text-xl border-2 active:bg-red-800 active:scale-95"
                    onClick={() => handleHitMiss(stunt.id, 'miss')}
                  >
                    MISS
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="pt-6 pb-16">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md flex items-center justify-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Reset All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg border-2 border-gray-200 shadow-xl z-50 w-[90%] max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-red-600 mb-2">
                  WARNING!
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base text-gray-700">
                  Are you sure you want to reset?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 flex justify-end gap-3">
                <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 px-6">
                  No
                </AlertDialogCancel>
                <Button
                  onClick={() => {
                    resetAll();
                    const closeDialog = document.querySelector(
                      '[data-state="open"] button[data-state="closed"]'
                    );
                    if (closeDialog) {
                      (closeDialog as HTMLButtonElement).click();
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6"
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
