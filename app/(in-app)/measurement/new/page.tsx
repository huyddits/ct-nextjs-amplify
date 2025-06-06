'use client';
import { AppInput, AppSelect } from '@/components/compose';
import { VideoPlayer } from '../_components';
import { Button } from '@/components/ui/button';
import { useMeasurement } from './_hook';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useMeasurementStore } from '@/store/useMeasurement.store';
export default function MeasurementNewPage() {
  const { measurementListOptions } = useMeasurementStore();
  const { control, measurementList, getMeasurementList } = useMeasurement({
    onSuccess: () => {},
    onFailure: () => {},
  });

  useEffect(() => {
    getMeasurementList();
  }, []);

  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <div className="py-4">
        <div className="space-y-6">
          <div>
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
          </div>

          {measurementList[0] && (
            <>
              <VideoPlayer source={measurementList[0].videoLink ?? ''} />

              <div>
                <h3 className="text-gray-700 font-medium mb-2">Instructions:</h3>
                <p className="text-gray-600">{measurementList[0].instruction}</p>
              </div>
            </>
          )}

          <div>
            <AppSelect
              label="Select Athlete"
              selectedValue="john-smith"
              options={[
                { label: 'John Smith', value: 'john-smith' },
                { label: 'Sarah Johnson', value: 'sarah-johnson' },
                { label: 'Michael Williams', value: 'michael-williams' },
              ]}
              onChangeSelected={value => console.log(value)}
              fullWidth
            />
          </div>

          <div>
            <AppInput
              label="Record Result"
              inputProps={{ placeholder: 'Enter measurement', type: 'number' }}
              onChange={value => console.log(value)}
              postfix={measurementList[0]?.imperialUnit}
            />
          </div>

          <Button size="lg" className="w-full">
            Save Result
          </Button>
        </div>
      </div>
    </div>
  );
}
