'use client';
import { AppInput, AppSelect } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useAuthStore } from '@/store';
import { useAcknowledgement } from '@/hooks';
import { TIME_UNIT } from '@/utils/constants';
import { VideoPlayer } from '../../_components';
import { useMeasurement } from '../_hook';

export default function MeasurementNewAthletePage() {
  const { info } = useAuthStore();
  const { acknowledgementFitness } = useAcknowledgement();
  const {
    control,
    measurementList,
    getMeasurementList,
    selectedMeasurement,
    onSubmit,
    setValue,
    formState: { isValid },
    loading,
    trigger,
    setError,
    clearErrors,
  } = useMeasurement({
    onSuccess: () => {
      setValue('result', '');
      setValue('measurement', measurementList[0]?.measurementsId.toString() || '');
    },
    onFailure: () => {},
  });

  useEffect(() => {
    getMeasurementList();
  }, []);

  const measurementOptions = useMemo(() => {
    return measurementList.map(item => ({
      label: item.name,
      value: item.measurementsId.toString(),
    }));
  }, [measurementList]);

  const postfixUnit =
    info?.measurementUnitType?.toLowerCase() === 'metric'
      ? selectedMeasurement?.metricUnit
      : selectedMeasurement?.imperialUnit;

  if (!acknowledgementFitness) return null;

  const validateAndFormat = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const digits = value.replace(/\D/g, '');
    if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
      if (digits.length < 2) return null;
      const minutes = digits.slice(0, 2);
      let seconds = digits.slice(2, 4) || '00';
      if (seconds?.length === 1) {
        seconds = seconds + '0';
      }
      if (+seconds > 59) seconds = '59';
      return `${minutes}:${seconds}`;
    } else {
      const numericStr = trimmed.replace(/^0+(?=\d)/, '').replace(',', '.');
      const numeric = Number(numericStr);
      if (isNaN(numeric) || numeric < 0 || numeric > 1000) return null;
      return numeric.toString();
    }
  };

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
                <p className="text-gray-600 break-all whitespace-pre-wrap">
                  {selectedMeasurement?.instruction}
                </p>
              </div>
            </>
          )}

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
                    let value = e.target.value;
                    if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
                      const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
                      let formatted = '';

                      if (digitsOnly.length <= 2) {
                        formatted = digitsOnly;
                      } else {
                        const minutes = digitsOnly.slice(0, 2);
                        const seconds = digitsOnly.slice(2, 4);
                        formatted = `${minutes}:${seconds}`;
                      }

                      field.onChange(formatted);
                    } else {
                      field.onChange(value);
                    }
                  }}
                  onBlur={() => {
                    const formatted = validateAndFormat(field.value ?? '');
                    if (formatted !== null) {
                      clearErrors('result');
                      field.onChange(formatted);
                    } else {
                      setError('result', {
                        type: 'manual',
                        message:
                          postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS
                            ? 'Please enter valid format MM:SS'
                            : 'Please enter number between 0 and 1000',
                      });
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
