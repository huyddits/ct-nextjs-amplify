'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUpRightIcon, InfoIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { AppSelect } from '@/components/compose';
import usePastMeasurement from '../_hooks/usePastMeasurement';

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

export default function MeasurementPastPage() {
  const {
    measurementList,
    selectedMeasurement,
    dataImprovement,
    dataLastThreeMonths,
    dataLatestResult,
    dataResultForAll,
    dataThreeLatestResults,
    onUpdateMeasurement,
  } = usePastMeasurement();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
        <div className="py-4">
          <div className="space-y-6">
            <AppSelect
              label={'Measurement Type'}
              options={measurementList}
              selectedValue={selectedMeasurement}
              onChangeSelected={onUpdateMeasurement}
              fullWidth
            />

            {/* Progress Chart Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Progress Chart</h2>
                <InfoIcon className="h-4 w-4 text-gray-400" />
              </div>

              <div className="bg-white p-4 rounded-lg space-y-4">
                <div className="h-[200px] w-full">
                  {dataLastThreeMonths && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dataLastThreeMonths.results}>
                        <XAxis
                          dataKey="createdAt"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#666' }}
                          domain={[0, dataLastThreeMonths.maxResult]}
                          ticks={Array.from(
                            new Set([
                              0,
                              Math.round(dataLastThreeMonths.maxResult * 0.25),
                              Math.round(dataLastThreeMonths.maxResult * 0.5),
                              Math.round(dataLastThreeMonths.maxResult * 0.75),
                              dataLastThreeMonths.maxResult,
                            ])
                          )}
                        />
                        <Line
                          type="monotone"
                          dataKey="result"
                          stroke="var(--ct-green-500)"
                          strokeWidth={2}
                          dot={{
                            fill: 'var(--ct-green-500)',
                            strokeWidth: 0,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <ArrowUpRightIcon className="h-4 w-4" />
                      Latest Result
                    </div>
                    {dataLatestResult ? (
                      <div className="text-2xl font-semibold">
                        {dataLatestResult.result}
                        <span className="text-sm font-normal text-gray-500">
                          {dataLatestResult.measurementUnit}
                        </span>
                      </div>
                    ) : (
                      '0'
                    )}
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      Improvement
                    </div>

                    {dataImprovement ? (
                      <div className="text-2xl font-semibold">
                        {dataImprovement.improvement}
                        <span className=" ml-1 text-sm font-normal text-gray-500">
                          {dataImprovement.measurementUnit}
                        </span>
                      </div>
                    ) : (
                      '0'
                    )}
                  </Card>
                </div>
              </div>
            </div>

            {/* Recent Tests */}
            <div className="space-y-4">
              <h2 className="text-sm font-medium">Recent Tests</h2>
              <div className="bg-white rounded-lg">
                {!dataThreeLatestResults?.length ? (
                  <div className="text-gray-500 italic text-sm px-4 py-3"></div>
                ) : (
                  (dataThreeLatestResults ?? []).map(item => (
                    <div
                      key={item.measurementSessionId}
                      className="flex justify-between py-3 px-4 border-b last:border-b-0"
                    >
                      <span className="text-gray-600">{item.createdAt}</span>
                      <span className="font-medium">
                        {item.result ?? 0} {item.measurementUnit ?? ''}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Performance Measurements */}
            <div>
              <div className="bg-primary text-white py-2 px-4 font-medium rounded-t-lg">
                Current Measurements
              </div>
              <div className="bg-white rounded-b-lg divide-y">
                {dataResultForAll &&
                  dataResultForAll.map((item, index) => (
                    <div key={item.measurementId} className="flex justify-between py-3 px-4">
                      <div>{item.measurementName}</div>
                      <div className="text-right space-x-4">
                        <span>{item.result}</span>
                        <span className="text-gray-400">{item.createdAt}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
