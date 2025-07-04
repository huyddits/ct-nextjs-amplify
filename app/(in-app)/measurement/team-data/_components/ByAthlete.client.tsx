'use client';

import { useMemo } from 'react';
import { Info, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useTeamData } from '../_hook';
import { Controller } from 'react-hook-form';
import { AppSelect } from '@/components/compose';

export default function ByAthleteContent() {
  const {
    control,
    measurementList,
    coachStudentList,
    latestResult,
    improvement,
    lastThreeMonths,
    threeLatestResults,
    resultForAllMeasurements,
  } = useTeamData({
    onSuccess: () => {},
    onFailure: () => {},
  });

  const measurementOptions = useMemo(() => {
    return measurementList.map(item => ({
      label: item.name,
      value: item.measurementsId.toString(),
    }));
  }, [measurementList]);

  const athleteOptions = useMemo(() => {
    return coachStudentList.map(item => ({
      label: `${item.athlete.profile.firstName} ${item.athlete.profile.lastName}`,
      value: item.athleteId,
    }));
  }, [coachStudentList]);

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="space-y-6">
        <Controller
          control={control}
          name="athleteList"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label="Select Athlete"
              options={athleteOptions}
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
              options={measurementOptions}
              selectedValue={field.value}
              onChangeSelected={field.onChange}
              errorMessage={error?.message}
              fullWidth
            />
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Progress Chart</h2>
          </div>

          <div className="bg-white p-4 rounded-lg space-y-4">
            <div className="h-[200px] w-full">
              {lastThreeMonths && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lastThreeMonths.results}>
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
                      domain={[0, lastThreeMonths.maxResult]}
                      ticks={[
                        0,
                        Math.round(lastThreeMonths.maxResult * 0.25),
                        Math.round(lastThreeMonths.maxResult * 0.5),
                        Math.round(lastThreeMonths.maxResult * 0.75),
                        lastThreeMonths.maxResult,
                      ]}
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
                        {improvement.measurementUnit}
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
            {threeLatestResults.length === 0 ? (
              <div className="text-gray-500 italic text-sm px-4 py-3"></div>
            ) : (
              threeLatestResults.map(item => (
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

        <div>
          <div className="bg-primary text-white py-2 px-4 font-medium rounded-t-lg">
            Current Measurements
          </div>
          <div className="bg-white rounded-b-lg divide-y">
            {resultForAllMeasurements.length === 0 ? (
              <div className="flex justify-between py-3 px-4"></div>
            ) : (
              resultForAllMeasurements.map(item => (
                <div key={item.measurementId} className="flex justify-between py-3 px-4">
                  <div>{item.measurementName}</div>
                  <div className="text-right space-x-4">
                    <span>{item.result}</span>
                    <span className="text-gray-400">{item.createdAt}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
