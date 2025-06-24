import { CheckOffApi, MeasurementApi } from '@/api';
import { CoachStudentPayload } from '@/api/types/measurement';
import { useLoading } from '@/hooks';
import { useAuthStore, useMeasurementStore } from '@/store';
import { CoachStudentItem } from '@/store/useMeasurement.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { array, InferType, object, string } from 'yup';

type UseCheckOffNewFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  assignedDate: string(),
  dueDate: string().required(),
  assignedTask: string().required(),
  note: string().max(500),
  receivers: array(
    object().shape({
      userId: string(),
    })
  )
    .min(1)
    .required(),
});

export const useCheckOffNew = (options: UseCheckOffNewFormOptions) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [coachStudentList, setCoachStudentList] = useState<CoachStudentItem[]>([]);
  const { info } = useAuthStore();
  const { coachStudent: coachStudentListFromStore, setCoachStudent } = useMeasurementStore();
  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      assignedDate: format(new Date(), 'MM/dd/yyyy'),
      dueDate: '',
      assignedTask: '',
      note: '',
      receivers: [],
    },
    mode: 'onChange',
  });

  type FormType = InferType<typeof schema>;

  const onSendCheckOff = async (formData: FormType) => {
    console.log('Submitting check off form with:', formData);
    try {
      startLoading();
      await CheckOffApi.postCheckOff({
        assigned_date: formData.assignedDate
          ? format(new Date(formData.assignedDate), 'yyyy-MM-dd')
          : '',
        due_date: formData.dueDate ? format(new Date(formData.dueDate), 'yyyy-MM-dd') : '',
        assigned_task: formData.assignedTask ?? '',
        note: formData.note ?? '',
        receivers: formData.receivers.map(data => ({
          user_id: data.userId ?? '',
        })),
      });
      toast.success('Successfully save the check off');
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const onError = (err: any) => {
    toast.error('Failed to save check off');
    options?.onFailure?.('Failed to save check off');
  };

  const onSubmit = handleSubmit(onSendCheckOff, onError);

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

  useEffect(() => {
    if (!info?.coachCode) {
      return;
    }
    const payload: CoachStudentPayload = {
      coach_code: info.coachCode,
    };

    getCoachStudentList(payload);
  }, [info?.coachCode]);

  return {
    loading,
    setValue,
    onSubmit,
    control,
    coachStudentList,
    getCoachStudentList,
    reset,
  };
};
