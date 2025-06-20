'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, UserCircle2, Target, Dumbbell, Ruler, Download } from 'lucide-react';
import { CheckOffCard } from './_components';

// Sample check-off data
const checkOffs = [
  {
    id: 1,
    athlete: 'Athlete Name',
    task: 'Skill / Challenge Text',
    athleteNotes: '',
    video: '/placeholder-video-1.mp4',
  },
  {
    id: 2,
    athlete: 'Athlete Name',
    task: 'Skill / Challenge Text',
    athleteNotes: '',
    video: '/placeholder-video-2.mp4',
  },
  {
    id: 3,
    athlete: 'Athlete Name',
    task: 'Skill / Challenge Text',
    athleteNotes: '',
    video: '/placeholder-video-3.mp4',
  },
];

export default function Training() {
  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="space-y-8">
        {checkOffs.map(checkOff => (
          <CheckOffCard key={checkOff.id} checkOff={checkOff} />
        ))}
      </div>
    </div>
  );
}
