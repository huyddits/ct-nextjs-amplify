import { useCallback, useEffect, useMemo, useState } from 'react';
import { StrengthApi } from '@/api';
import { useStrengthStore } from '@/store';
import { debounce } from '@/utils/helpers';

export type ProgramItem = {
  id: string;
  name: string;
  copiedAt: string;
  exercises: string;
  startedAt: string;
  finishedAt: string;
  trainingType: string;
  type: string;
};
export const useListStrengthPrograms = () => {
  const { programType, setProgramType } = useStrengthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [listStrengthPrograms, setListStrengthPrograms] = useState<ProgramItem[]>([]);

  const debounceSearch = useMemo(() => debounce(setSearchQuery, 500), []);

  const fetchListStrengthPrograms = useCallback(async () => {
    try {
      const response = await StrengthApi.getListStrengthPrograms({
        name: searchQuery,
        type: programType,
      });
      const { data, error } = response.data;
      if (!data) throw error;

      setListStrengthPrograms(
        data.map(item => ({
          copiedAt: item.copied_at,
          finishedAt: item.finished_at,
          id: item.program_id.toString(),
          name: item.name,
          startedAt: item.started_at,
          trainingType: item.training_type,
          type: item.type,
          exercises: item.exercises,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery, programType]);

  useEffect(() => {
    fetchListStrengthPrograms();
  }, [fetchListStrengthPrograms]);

  return {
    type: programType,
    searchQuery,
    listStrengthPrograms,
    setType: setProgramType,
    debounceSearch,
    fetchListStrengthPrograms,
  };
};
