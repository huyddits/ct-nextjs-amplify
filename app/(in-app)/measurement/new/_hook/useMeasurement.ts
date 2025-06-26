import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { MeasurementApi } from '@/api';
import { CoachStudentItem, MeasurementItem } from '../_types';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMeasurementStore } from '@/store/useMeasurement.store';
import { InferType, object, string } from 'yup';
import { CoachStudentPayload } from '@/api/types/measurement';
import { useAuthStore } from '@/store';
import { useLoading } from '@/hooks';

type UseMeasurementFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  measurement: string().required('Measurement is a required field'),
  athleteList: string().required('Athlete is a required field'),
  result: string()
    .required('Result is a required field')
    .test('is-valid-distance', 'Result must not exceed 100', value => {
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 1000;
    }),
});

export const useMeasurement = (options?: UseMeasurementFormOptions) => {
  const { info } = useAuthStore();
  const { loading, startLoading, stopLoading } = useLoading();
  const {
    baseMeasurementList,
    coachStudent: coachStudentList,
    setBaseMeasurementList,
    setCoachStudent,
    setRefreshBasesSpotter,
    setRefreshFlyer,
  } = useMeasurementStore();
  const { control, setValue, getValues, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      measurement: '',
      athleteList: '',
      result: '',
    },
    mode: 'onChange',
  });

  type FormType = InferType<typeof schema>;

  const getMeasurementList = async () => {
    if (baseMeasurementList.length > 0) {
      return;
    }
    try {
      const response = await MeasurementApi.getMeasurementList();
      const { data, error } = response.data;
      if (error) throw error;
      const dataResponse =
        data?.map(data => ({
          measurementsId: data.measurement_id,
          name: data.name,
          instruction: data.instruction,
          imperialUnit: data.imperial_unit,
          metricUnit: data.metric_unit,
          thumbnailLink: data.thumbnail_link,
          videoLink: data.video_link,
        })) ?? [];
      setBaseMeasurementList(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const measurement = useWatch({ control, name: 'measurement' });

  const selectedMeasurement = useMemo(() => {
    return baseMeasurementList.find(m => m.measurementsId.toString() === measurement);
  }, [baseMeasurementList, measurement]);

  const getCoachStudentList = async (payload: CoachStudentPayload) => {
    if (coachStudentList.length > 0) {
      return;
    }
    try {
      const response = await MeasurementApi.getCoachStudentList(payload);
      const { data, error } = response.data;
      if (!data) throw error;

      const dataResponse = data.map(data => ({
        coachStudentId: data.coach_student_id,
        status: data.status,
        athleteId: data.athlete_id,
        athlete: {
          accountType: data.athlete.account_type,
          email: data.athlete.email,
          stripeCustomerId: data.athlete.stripe_customer_id,
          stripeSubscriptionId: data.athlete.stripe_subscription_id,
          isActive: data.athlete.is_active,
          profile: {
            profileId: data.athlete.profile.profile_id,
            firstName: data.athlete.profile.first_name,
            lastName: data.athlete.profile.last_name,
            schoolName: data.athlete.profile.school_name,
            dateOfBirth: data.athlete.profile.date_of_birth,
            coachCode: data.athlete.profile.coach_code,
          },
        },
      }));
      setCoachStudent(dataResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveResult = async (formData: FormType) => {
    try {
      startLoading();
      await MeasurementApi.postMeasurement({
        measurement_id: Number(formData.measurement),
        athlete_id: formData.athleteList ?? '',
        result: Number(formData.result),
      });
      setRefreshBasesSpotter(true);
      setRefreshFlyer(true);

      await getMeasurementList();
      toast.success('Successfully saved the measurement');
      options?.onSuccess?.();
    } catch (error: unknown) {
      console.error('Measurement submission failed:', error);
      options?.onFailure?.('Failed to save measurement');
    } finally {
      stopLoading();
    }
  };

  const onSubmit = handleSubmit(onSaveResult);

  useEffect(() => {
    getMeasurementList();
  }, []);

  useEffect(() => {
    if (baseMeasurementList[0] && !getValues('measurement')) {
      setValue('measurement', baseMeasurementList[0].measurementsId.toString());
    }
  }, [baseMeasurementList, setValue]);

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

  return {
    measurementList: baseMeasurementList,
    getMeasurementList,
    control,
    coachStudentList,
    getCoachStudentList,
    onSubmit,
    getValues,
    setValue,
    formState,
    selectedMeasurement,
    loading,
  };
};
