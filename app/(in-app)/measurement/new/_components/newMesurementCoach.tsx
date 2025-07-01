'use client';
import { AppInput, AppSelect } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useMeasurementStore } from '@/store/useMeasurement.store';
import { useAuthStore } from '@/store';
import { CoachStudentPayload } from '@/api/types/measurement';
import { useAcknowledgement } from '@/hooks';
import { TIME_UNIT } from '@/utils/constants';
import { VideoPlayer } from '../../_components';
import { useMeasurement } from '../_hook';
export default function MeasurementNewCoachPage() {
  const { measurementListOptions } = useMeasurementStore();
  const { info } = useAuthStore();
  const { acknowledgementFitness } = useAcknowledgement();
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
    loading,
  } = useMeasurement({
    onSuccess: () => {
      setValue('result', '');
      setValue('athleteResults', []);
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

  if (!acknowledgementFitness) return;

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
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
                <p className="text-gray-600  break-all whitespace-pre-wrap">
                  {selectedMeasurement?.instruction}
                </p>
              </div>
            </>
          )}

          <div>
            <Controller
              control={control}
              name="athleteResults"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label="Select Athlete"
                  options={athleteOptions}
                  placeholder="Choose an athlete"
                  // selectedValue={field.value}
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
                    type: 'text',
                    min: 0,
                    className:
                      'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                  }}
                  errorMessage={error?.message}
                  value={field.value}
                  postfix={postfixUnit}
                  onChange={e => {
                    const raw = e.target.value;
                    if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
                      const digits = raw.replace(/\D/g, '');
                      let formatted = '';
                      if (digits.length <= 2) {
                        formatted = digits;
                      } else {
                        const minutes = digits.slice(0, 2);
                        let seconds = digits.slice(2, 4);
                        formatted = `${minutes}:${seconds}`;
                      }
                      field.onChange(formatted);
                    } else {
                      const input = e.target.value;
                      if (/^\d*\.?\d*$/.test(input)) field.onChange(input);
                    }
                  }}
                  onBlur={() => {
                    if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
                      const raw = field.value;
                      const digits = raw.replace(/\D/g, '');
                      let formatted = '';
                      if (digits.length <= 2) {
                        formatted = digits.padStart(2, '0') + ':00';
                      } else {
                        const minutes = digits.slice(0, 2);
                        let seconds = digits.slice(2, 4);
                        if (+seconds > 59) {
                          seconds = '59';
                        }
                        formatted = `${minutes}:${seconds}`;
                      }
                      field.onChange(formatted);
                    }
                  }}
                />
              )}
            />
          </div>

          <Button
            type="button"
            onClick={onSubmit}
            size="lg"
            className="w-full"
            disabled={!isValid}
            loading={loading}
          >
            Save Result
          </Button>
        </div>
      </div>
    </div>
  );
}
