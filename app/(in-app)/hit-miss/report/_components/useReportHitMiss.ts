import { useEffect, useState } from 'react';
import { InferType, number, object, string } from 'yup';
import { HitMissCurrentItem, HitMissRoutine } from '../_type';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HitMissApi } from '@/api';
import {
  SesstionCompleteItemPayload,
  SesstionEventItemPayload,
  SesstionPayload,
  SummaryPayload,
} from '@/api/types/hitMiss';

type UseReportHitMissFormOptions = {
  onSuccess: () => void;
  onFailure: (message: string) => void;
};

const schema = object().shape({
  routines: string(),
  current: string(),
  id: number(),
  status: string(),
  sectionId: number(),
  groupId: number(),
  type: string(),
});

export const useReportHitMiss = (options?: UseReportHitMissFormOptions) => {
  const [hitMissRoutineList, setHitMissRoutineList] = useState<HitMissRoutine[]>([]);
  const [hitMissCurrentList, setHitMissCurrentList] = useState<HitMissCurrentItem>();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      routines: '',
      current: '',
    },
    mode: 'onChange',
  });
  const routineId = useWatch({ control, name: 'routines' });

  const getHitMissRoutinesList = async () => {
    try {
      const response = await HitMissApi.getHitMissRoutineList();
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        routineId: data.routine_id,
        name: data.name,
        description: data.description,
        sections: data.sections.map(data => ({
          sectionId: data.section_id,
          name: data.name,
          groups: data.groups.map(data => ({
            groupId: data.group_id,
            users: data.users.map(data => ({
              userId: data.user_id,
              firstName: data.first_name,
              lastName: data.last_name,
            })),
          })),
        })),
      }));
      setHitMissRoutineList(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getHitMissCurrentList = async (payload: SummaryPayload) => {
    try {
      const response = await HitMissApi.getHitMissRoutineCurrent(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = {
        id: data.id,
        status: data.status,
        startedAt: data.completed_at,
        completedAt: data.completed_at,
        events: {
          routineId: data.events.routine_id,
          name: data.events.name,
          description: data.events.description,
          sections: data.events.sections.map(section => ({
            sectionId: section.section_id,
            name: section.name,
            groups: section.groups.map(group => ({
              groupId: group.group_id,
              repCount: group.rep_count,
              hitPercentage: group.hit_percentage,
              events: group.events,
              users: group.users.map(user => ({
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
              })),
            })),
          })),
        },
      };

      setHitMissCurrentList(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  type FormType = InferType<typeof schema>;

  const onHandleHitMiss = async (formData: FormType) => {
    try {
      if (!formData.id || isNaN(Number(formData.id))) {
        throw new Error('Invalid session ID');
      }

      const params: SesstionPayload = {
        session_id: Number(formData.id),
      };

      const payload: SesstionEventItemPayload = {
        section_id: Number(formData.sectionId),
        group_id: Number(formData.groupId),
        type: formData.type ?? '',
      };

      await HitMissApi.postHitMissEvent(params, payload);
      await getHitMissCurrentList({ routine_id: Number(routineId) });
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHitMissSession = async (params: SesstionPayload) => {
    try {
      await HitMissApi.deleteHitMissEvent(params);
      await getHitMissCurrentList({ routine_id: Number(routineId) });
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onCompleteHitMiss = async (params: SesstionPayload) => {
    try {
      await HitMissApi.postHitMissComplete(params);
      await getHitMissCurrentList({ routine_id: Number(routineId) });
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (formData: FormType) => {
    onHandleHitMiss(formData);
  };

  const onDelete = () => {
    if (!hitMissCurrentList?.id) return;
    deleteHitMissSession({ session_id: hitMissCurrentList.id });
  };

  const onSubmitComplete = () => {
    if (!hitMissCurrentList?.id) return;
    onCompleteHitMiss({ session_id: hitMissCurrentList.id });
  };

  useEffect(() => {
    getHitMissRoutinesList();
  }, []);

  useEffect(() => {
    if (!routineId) return;
    const payload: SummaryPayload = {
      routine_id: Number(routineId),
    };
    getHitMissCurrentList(payload);
  }, [routineId]);

  return {
    hitMissRoutineList,
    getHitMissRoutinesList,
    control,
    hitMissCurrentList,
    getHitMissCurrentList,
    onSubmitComplete,
    onSubmit,
    onDelete,
  };
};
