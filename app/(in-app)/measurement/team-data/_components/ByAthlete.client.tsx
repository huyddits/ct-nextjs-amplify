'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  UserCircle2,
  Target,
  Dumbbell,
  Ruler,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { date: '1/1', value: 150 },
  { date: '1/15', value: 155 },
  { date: '2/1', value: 160 },
  { date: '2/15', value: 165 },
  { date: '3/1', value: 170 },
];

const performanceData = [
  { test: 'Broad Jump', value: 0, date: '7/15/23' },
  { test: 'Left Single Leg Triple Jump', value: 0, date: '7/15/23' },
  { test: 'Right Single Leg Triple Jump', value: 0, date: '7/15/23' },
  { test: 'Vertical Jump', value: 0, date: '7/15/23' },
  { test: 'Max Squat', value: 0, date: '7/15/23' },
  { test: 'Max Bench Press', value: 0, date: '7/15/23' },
  { test: 'Max Shoulder Press', value: 0, date: '7/15/23' },
  { test: 'Max Dead Lift', value: 0, date: '7/15/23' },
  { test: '40 Yard Dash', value: 0, date: '7/15/23' },
  { test: 'Mile Time', value: 0, date: '7/15/23' },
  { test: 'Two Mile Time', value: 0, date: '7/15/23' },
];

export default function ByAthleteContent() {
  const [selectedAthlete, setSelectedAthlete] = useState('');
  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* Athlete Selector */}
        <Select>
          <SelectTrigger className="w-full bg-white border-2">
            <SelectValue placeholder="Select Athlete" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="athlete1">Athlete 1</SelectItem>
            <SelectItem value="athlete2">Athlete 2</SelectItem>
            <SelectItem value="athlete3">Athlete 3</SelectItem>
          </SelectContent>
        </Select>

        {/* Measurement Type Selector - Moved here */}
        <Select defaultValue="maxBench">
          <SelectTrigger className="w-full bg-white border-2">
            <SelectValue>Max Bench</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maxBench">Max Bench</SelectItem>
            <SelectItem value="maxSquat">Max Squat</SelectItem>
            <SelectItem value="maxDeadlift">Max Dead Lift</SelectItem>
            <SelectItem value="maxShoulderPress">Max Shoulder Press</SelectItem>
          </SelectContent>
        </Select>

        {/* Progress Chart Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Progress Chart</h2>
            <Info className="h-4 w-4 text-gray-400" />
          </div>

          <div className="bg-white p-4 rounded-lg space-y-4">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                    domain={[0, 180]}
                    ticks={[0, 45, 90, 135, 180]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#257951"
                    strokeWidth={2}
                    dot={{ fill: '#257951', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <ArrowUpRight className="h-4 w-4" />
                  Latest Result
                </div>
                <div className="text-2xl font-semibold">
                  170 <span className="text-sm font-normal text-gray-500">lbs</span>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Improvement
                </div>
                <div className="text-2xl font-semibold">
                  20.00 <span className="text-sm font-normal text-gray-500">lbs</span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium">Recent Tests</h2>
          <div className="bg-white rounded-lg">
            {[
              { date: '3/1', value: '170 lbs' },
              { date: '2/15', value: '165 lbs' },
              { date: '2/1', value: '160 lbs' },
            ].map((test, i) => (
              <div key={i} className="flex justify-between py-3 px-4 border-b last:border-b-0">
                <span className="text-gray-600">{test.date}</span>
                <span className="font-medium">{test.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Measurements (renamed from Performance Measurements) */}
        <div>
          <div className="bg-primary text-white py-2 px-4 font-medium rounded-t-lg">
            Current Measurements
          </div>
          <div className="bg-white rounded-b-lg divide-y">
            {performanceData.map((item, i) => (
              <div key={i} className="flex justify-between py-3 px-4">
                <div>{item.test}</div>
                <div className="text-right space-x-4">
                  <span>{item.value}</span>
                  <span className="text-gray-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
