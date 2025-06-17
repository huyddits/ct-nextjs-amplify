'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { AppInput, AppTextarea, VideoPlayer } from '@/components/compose';
import { Button } from '@/components/ui/button';

export type CheckOffItem = {
  id: number;
  athlete: string;
  task: string;
  athleteNotes: string;
  video: string;
};

export const checkOffs: CheckOffItem[] = [
  {
    id: 1,
    athlete: 'Athlete One',
    task: 'Backflip Challenge',
    athleteNotes: 'Felt confident with the landing.',
    video: '/placeholder-video-1.mp4',
  },
  {
    id: 2,
    athlete: 'Athlete Two',
    task: 'Handstand Walk',
    athleteNotes: 'Needs more balance control.',
    video: '/placeholder-video-2.mp4',
  },
  {
    id: 3,
    athlete: 'Athlete Three',
    task: 'Rope Climb',
    athleteNotes: 'Good grip strength shown.',
    video: '/placeholder-video-3.mp4',
  },
];

export default function CheckOffReviewPage() {
  const [statuses, setStatuses] = useState<
    Record<number, 'completed' | 'not_completed' | 'excused' | null>
  >({});

  const handleStatusChange = (id: number, status: 'completed' | 'not_completed' | 'excused') => {
    setStatuses(prev => ({ ...prev, [id]: status }));
  };

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast">
      <div className="max-w-3xl mx-auto px-4 space-y-10">
        {checkOffs.map(checkOff => (
          <div key={checkOff.id} className="bg-white rounded-lg shadow-sm">
            <div className="mb-6 relative">
              <VideoPlayer source={checkOff.video} />
              <a
                href={checkOff.video}
                download
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Download video"
                title="Download video"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>

            <div className="space-y-6 p-4">
              <div className="flex items-center">
                <span className="font-medium min-w-[120px]">Athlete:</span>
                <AppInput
                  label=""
                  inputProps={{
                    defaultValue: checkOff.athlete,
                    type: 'text',
                    placeholder: 'Enter athlete name',
                    className: 'flex-1 p-2 bg-gray-50 border rounded',
                  }}
                  fullWidth
                />
              </div>

              <div className="flex items-center">
                <span className="font-medium min-w-[120px]">Check-Off Task:</span>
                <AppInput
                  label=""
                  inputProps={{
                    defaultValue: checkOff.task,
                    type: 'text',
                    placeholder: 'Enter task name',
                    className: 'flex-1 p-2 bg-gray-50 border rounded',
                  }}
                  fullWidth
                />
              </div>

              <div className="space-y-2">
                <span className="font-medium">Athlete Notes:</span>
                <AppTextarea
                  label=""
                  textareaProps={{
                    defaultValue: checkOff.athleteNotes,
                    placeholder: 'Add notes here',
                    className: 'w-full h-24 p-3 border-primary ',
                  }}
                />
              </div>

              <div
                className="grid grid-cols-3 gap-2 mt-4"
                role="radiogroup"
                aria-label="Completion status"
              >
                {['completed', 'not_completed', 'excused'].map(option => (
                  <Button
                    key={option}
                    type="button"
                    onClick={() => handleStatusChange(checkOff.id, option as any)}
                    className={`py-2 px-1 rounded-md text-xs font-medium border-2 transition-colors ${
                      statuses[checkOff.id] === option
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-primary'
                    }`}
                    aria-checked={statuses[checkOff.id] === option}
                    role="radio"
                  >
                    {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>

              <AppTextarea
                label=""
                textareaProps={{
                  placeholder: 'Check Off Feedback',
                  className: 'w-full h-32 p-3 border-primary ',
                }}
              />

              <Button className="w-full" size="lg">
                Save Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
