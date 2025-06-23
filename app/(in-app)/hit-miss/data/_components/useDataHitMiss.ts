import { useEffect, useState } from 'react';
import { HitMissRoutine, summaryGroupResponse, summarySectionResponse } from '../_type';
import { HitMissApi } from '@/api';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { summaryPlayload } from '@/api/types/hitMiss';

type UseDataHitMissFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  routines: string(),
});
export const useDataHitMiss = (options?: UseDataHitMissFormOptions) => {
  const [hitMissRoutineList, setHitMissRoutineList] = useState<HitMissRoutine[]>([]);
  const [summarySection, setSummarySection] = useState<summarySectionResponse[]>([]);
  const [summaryGroup, setSummaryGroup] = useState<summaryGroupResponse[]>([]);
  const { control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      routines: '',
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

  const hitMissRoutines = useWatch({ control, name: 'routines' });
  const selectedHitMissRoutines = hitMissRoutineList.find(
    m => m.routineId.toString() === hitMissRoutines
  );

  const getSummarySection = async (params: summaryPlayload) => {
    try {
      const response = await HitMissApi.getSummarySection(params);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        routineId: data.routine_id,
        from: data.from,
        to: data.to,
        sections: data.sections.map(data => ({
          sectionId: data.section_id,
          name: data.name,
          totalReps: data.total_reps,
          hitPercentage: data.hit_percentage,
        })),
      }));
      setSummarySection(dataResponse);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSummaryGroup = async (params: summaryPlayload) => {
    try {
      const response = await HitMissApi.getSummaryGroup(params);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        routineId: data.routine_id,
        from: data.from,
        to: data.to,
        sections: data.sections.map(data => ({
          sectionId: data.section_id,
          name: data.name,
          groups: data.groups.map(data => ({
            groupId: data.group_id,
            totalReps: data.total_reps,
            hitPercentage: data.hit_percentage,
          })),
        })),
      }));
      setSummaryGroup(dataResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHitMissRoutinesList();
  }, []);

  useEffect(() => {
    if (!routineId) return;
    const payload: summaryPlayload = {
      routine_id: Number(routineId),
    };
    getSummarySection(payload);
    getSummaryGroup(payload);
  }, [routineId]);

  return {
    hitMissRoutineList,
    getHitMissRoutinesList,
    control,
    selectedHitMissRoutines,
    getSummarySection,
    summarySection,
    getSummaryGroup,
    summaryGroup,
  };
};
