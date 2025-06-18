import { useEffect, useState } from 'react';
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
  result: string().required('Result is a required field'),
});

export const useMeasurement = (options?: UseMeasurementFormOptions) => {
  const { info } = useAuthStore();
  const [measurementList, setMeasurementList] = useState<MeasurementItem[]>([]);
  const [coachStudentList, setCoachStudentList] = useState<CoachStudentItem[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const {
    baseMeasurementList,
    coachStudent: coachStudentListFromStore,
    setRawMeasurementList,
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
      setMeasurementList(baseMeasurementList);
      return;
    }
    try {
      const response = await MeasurementApi.getMeasurementList();
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        measurementsId: data.measurement_id,
        name: data.name,
        instruction: data.instruction,
        imperialUnit: data.imperial_unit,
        metricUnit: data.metric_unit,
        thumbnailLink: data.thumbnail_link,
        videoLink: data.video_link,
      }));
      setRawMeasurementList(dataResponse);
      setMeasurementList(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const measurement = useWatch({ control, name: 'measurement' });
  const selectedMeasurement = measurementList.find(
    m => m.measurementsId.toString() === measurement
  );

  const getCoachStudentList = async (payload: CoachStudentPayload) => {
    if (coachStudentListFromStore.length > 0) {
      setCoachStudentList(coachStudentListFromStore);
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
      setCoachStudentList(dataResponse);
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
    if (measurementList[0] && !getValues('measurement')) {
      setValue('measurement', measurementList[0].measurementsId.toString());
    }
  }, [measurementList, setValue]);

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
    measurementList,
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
