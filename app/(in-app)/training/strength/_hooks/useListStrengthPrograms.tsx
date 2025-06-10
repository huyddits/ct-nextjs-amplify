import { useCallback, useEffect, useMemo, useState } from 'react';
import { StrengthApi } from '@/api';
import { useStrengthStore, TabsValue } from '@/store';
import { debounce } from '@/utils/helpers';

export type ProgramItem = {
  id: string;
  name: string;
  copiedAt: string;
  startedAt: string;
  finishedAt: string;
  trainingType: string;
  type: string;
};
export const useListStrengthPrograms = () => {
  const { programType } = useStrengthStore();
  const [type, setType] = useState(TabsValue.MyPrograms);
  const [searchQuery, setSearchQuery] = useState('');
  const [listStrengthPrograms, setListStrengthPrograms] = useState<ProgramItem[]>([]);

  const debounceSearch = useMemo(() => debounce(setSearchQuery, 500), []);

  const fetchListStrengthPrograms = useCallback(async () => {
    try {
      const response = await StrengthApi.getListStrengthPrograms({
        name: searchQuery,
        type: type,
      });
      console.log(response);
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
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, [type, searchQuery]);

  useEffect(() => {
    fetchListStrengthPrograms();
  }, [fetchListStrengthPrograms]);

  return {
    type,
    searchQuery,
    listStrengthPrograms,
    setType,
    debounceSearch,
    fetchListStrengthPrograms,
  };
};
