'use client';
import { AppInput, AppMultipleSelect, AppSelect } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useMeasurementStore } from '@/store/useMeasurement.store';
import { useAuthStore } from '@/store';
import { CoachStudentPayload } from '@/api/types/measurement';
import { useAcknowledgement } from '@/hooks';
import { TIME_UNIT } from '@/utils/constants';
import { VideoPlayer } from '../../_components';
import { useMeasurement } from '../_hook';
import ModalPopupMesurementCoach from './modalPopupMesurementCoach';
import { toast } from 'react-toastify';
export default function MeasurementNewCoachPage() {
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
    trigger,
  } = useMeasurement({
    onSuccess: () => {
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

  const [openModal, setOpenModal] = useState(false);
  const athleteIds = useWatch({ control, name: 'athleteId' }) || [];

  const selectedAthletes = coachStudentList.filter(c => athleteIds.includes(c.athleteId));

  const handleSaveResults = async (results: { athletId: string; result: string }[]) => {
    const validResults = results.filter(r => r.athletId && r.result?.trim());

    setValue('athleteResults', validResults);

    const isValid = await trigger('athleteResults');

    if (isValid) {
      onSubmit();
    } else {
      toast.error('Please check the results before submitting');
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
                <p className="text-gray-600  break-all whitespace-pre-wrap">
                  {selectedMeasurement?.instruction}
                </p>
              </div>
            </>
          )}

          <div>
            <Controller
              control={control}
              name="athleteId"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppMultipleSelect
                  label="Select Athlete"
                  options={athleteOptions || []}
                  placeholder="Choose an athlete"
                  selectedValues={value || []}
                  onChangeSelected={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={() => setOpenModal(true)}
            loading={loading}
            disabled={athleteIds.length === 0}
          >
            Set Record Result
          </Button>

          <ModalPopupMesurementCoach
            open={openModal}
            onClose={() => setOpenModal(false)}
            athletes={selectedAthletes}
            postfixUnit={postfixUnit}
            onSubmit={handleSaveResults}
          />
        </div>
      </div>
    </div>
  );
}
