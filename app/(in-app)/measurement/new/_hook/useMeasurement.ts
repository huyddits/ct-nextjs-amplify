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

type UseMeasurementFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  measurement: string().required(),
  athleteList: string(),
  result: string().required(),
});

export const useMeasurement = (options?: UseMeasurementFormOptions) => {
  const { info } = useAuthStore();
  const [measurementList, setMeasurementList] = useState<MeasurementItem[]>([]);
  const [coachStudentList, setCoachStudentList] = useState<CoachStudentItem[]>([]);
  const {
    rawMeasurementList,
    coachStudent: coachStudentListFromStore,
    setRawMeasurementList,
    setCoachStudent,
  } = useMeasurementStore();
  const { control, setValue, getValues } = useForm({
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
    if (rawMeasurementList.length > 0) {
      setMeasurementList(rawMeasurementList);
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
      await MeasurementApi.postMeasurement({
        measurement_id: Number(formData.measurement),
        athlete_id: formData.athleteList ?? '',
        result: Number(formData.result),
      });
      toast.success('Successfully saved the measurement');
      options?.onSuccess?.();
    } catch (error: unknown) {
      console.error('Measurement submission failed:', error);
      toast.error('Failed to save measurement');
      options?.onFailure?.('Failed to save measurement');
    }
  };

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

  useEffect(() => {
    if (coachStudentList[0]) {
      setValue('athleteList', coachStudentList[0].athleteId);
    }
  }, [coachStudentList, setValue]);

  return {
    measurementList,
    getMeasurementList,
    control,
    coachStudentList,
    getCoachStudentList,
    onSaveResult,
    getValues,
    selectedMeasurement,
  };
};
