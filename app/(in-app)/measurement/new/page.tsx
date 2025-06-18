'use client';
import { AppInput, AppSelect, VideoPlayer } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { useMeasurement } from './_hook';
import { useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useMeasurementStore } from '@/store/useMeasurement.store';
import { useAuthStore } from '@/store';
import { CoachStudentPayload } from '@/api/types/measurement';
import { SafeAreaDetection } from '@/app/_components';
export default function MeasurementNewPage() {
  const { measurementListOptions } = useMeasurementStore();
  const { info } = useAuthStore();
  const {
    control,
    measurementList,
    getMeasurementList,
    coachStudentList,
    getCoachStudentList,
    selectedMeasurement,
    onSubmit,
    setValue,
    formState: { isValid },
    getValues,
  } = useMeasurement({
    onSuccess: () => {
      setValue('result', '');
      setValue('athleteList', '');
      setValue('measurement', measurementList[0]?.measurementsId.toString() || '');
    },
    onFailure: () => {},
  });

  useEffect(() => {
    getMeasurementList();
  }, []);
  useEffect(() => {
    if (!info?.coachCode) {
      console.log('coachCode is missing!');
      return;
    }
    const payload: CoachStudentPayload = {
      coach_code: info.coachCode,
    };

    getCoachStudentList(payload);
  }, [info?.coachCode]);

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

  const postfixUnit =
    info?.measurementUnitType?.toLowerCase() === 'metric'
      ? selectedMeasurement?.metricUnit
      : selectedMeasurement?.imperialUnit;

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <SafeAreaDetection position="top" />
      <div className="py-4">
        <div className="space-y-6">
          <div>
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
          </div>

          {selectedMeasurement && (
            <>
              <VideoPlayer
                source={selectedMeasurement?.videoLink ?? ''}
                title={selectedMeasurement?.name ?? 'Measurement Video'}
              />

              <div>
                <h3 className="text-gray-700 font-medium mb-2">Instructions:</h3>
                <p className="text-gray-600">{selectedMeasurement?.instruction}</p>
              </div>
            </>
          )}

          <div>
            <Controller
              control={control}
              name="athleteList"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label="Select Athlete"
                  options={athleteOptions}
                  placeholder="Choose an athlete"
                  selectedValue={field.value}
                  onChangeSelected={field.onChange}
                  errorMessage={error?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="result"
              render={({ field, fieldState: { error } }) => (
                <AppInput
                  label="Record Result"
                  inputProps={{
                    placeholder: 'Enter measurement',
                    type: 'number',
                    min: 0,
                    className:
                      'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                  }}
                  errorMessage={error?.message}
                  {...field}
                  postfix={postfixUnit}
                />
              )}
            />
          </div>

          <Button type="button" onClick={onSubmit} size="lg" className="w-full" disabled={!isValid}>
            Save Result
          </Button>
        </div>
      </div>
    </div>
  );
}
