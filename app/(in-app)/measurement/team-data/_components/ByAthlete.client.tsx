'use client';

import { useEffect, useState } from 'react';
import { Info, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useTeamData } from '../_hook';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { AppSelect } from '@/components/compose';

export default function ByAthleteContent() {
  const {
    control,
    measurementList,
    getMeasurementList,
    coachStudentList,
    getCoachStudentList,
    latestResult,
    getLatestResult,
    improvement,
    getImprovement,
    lastThreeMonths,
    getLastThreeMonths,
    threeLatestResults,
    getThreeLatestResults,
    resultForAllMeasurements,
    getResultForAllMeasurements,
  } = useTeamData({
    onSuccess: () => {},
    onFailure: () => {},
  });

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="space-y-6">
        <Controller
          control={control}
          name="athleteList"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label="Select Athlete"
              options={coachStudentList.map(item => ({
                label: `${item.athlete.profile.firstName} ${item.athlete.profile.lastName}`,
                value: item.athleteId,
              }))}
              placeholder="Select Athlete"
              selectedValue={field.value}
              onChangeSelected={field.onChange}
              errorMessage={error?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="measurement"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label="Select Measurement"
              options={measurementList.map(item => ({
                label: item.name,
                value: item.measurementsId.toString(),
              }))}
              selectedValue={field.value}
              onChangeSelected={field.onChange}
              errorMessage={error?.message}
              fullWidth
            />
          )}
        />

        {/* Progress Chart Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Progress Chart</h2>
            <Info className="h-4 w-4 text-gray-400" />
          </div>

          <div className="bg-white p-4 rounded-lg space-y-4">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lastThreeMonths}>
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
                    domain={[0, 180]}
                    ticks={[0, 45, 90, 135, 180]}
                  />
                  <Line
                    type="monotone"
                    dataKey="result"
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
                  {latestResult ? (
                    <div className="text-2xl font-semibold">
                      {latestResult.result}
                      <span className=" ml-1 text-sm font-normal text-gray-500">
                        {latestResult.measurementUnit}
                      </span>
                    </div>
                  ) : (
                    '0'
                  )}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Improvement
                </div>
                <div className="text-2xl font-semibold">
                  {improvement ? (
                    <div className="text-2xl font-semibold">
                      {improvement.improvement}
                      <span className=" ml-1 text-sm font-normal text-gray-500">
                        {improvement.unit}
                      </span>
                    </div>
                  ) : (
                    '0'
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium">Recent Tests</h2>
          <div className="bg-white rounded-lg">
            {threeLatestResults.map((item, i) => {
              return (
                <div key={i} className="flex justify-between py-3 px-4 border-b last:border-b-0">
                  <span className="text-gray-600">{item.createdAt}</span>
                  <span className="font-medium">
                    {item.result ?? 0} {item.measurementUnit ?? ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="bg-primary text-white py-2 px-4 font-medium rounded-t-lg">
            Current Measurements
          </div>
          <div className="bg-white rounded-b-lg divide-y">
            {resultForAllMeasurements.map((item, i) => (
              <div key={i} className="flex justify-between py-3 px-4">
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
  );
}
