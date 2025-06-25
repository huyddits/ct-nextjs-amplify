import { useCallback, useEffect, useMemo, useState } from 'react';
import { StrengthApi } from '@/api';
import { useAuthStore, useStrengthStore } from '@/store';
import { debounce } from '@/utils/helpers';
import { AccountType } from '@/utils/types';
import { useLoading, usePagination } from '@/hooks';

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
  const { info } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [listStrengthPrograms, setListStrengthPrograms] = useState<ProgramItem[]>([]);
  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();
  const { loading, startLoading, stopLoading } = useLoading();
  const isCoach = useMemo(() => info?.accountType === AccountType.Coach, [info?.accountType]);

  const debounceSearch = useMemo(() => debounce(setSearchQuery, 500), []);

  const fetchListStrengthPrograms = useCallback(
    async (pageNumber?: number) => {
      try {
        startLoading();
        const response = await StrengthApi.getListStrengthPrograms({
          name: searchQuery,
          type: programType,
          page: pageNumber || page,
          limit,
        });
        const { data, meta, error } = response.data;
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
        setPage(pageNumber || page);
        setTotalPages(meta?.totalPages ?? 0);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    },
    [searchQuery, programType, page, limit]
  );

  const onLoadMore = async () => {
    try {
      const response = await StrengthApi.getListStrengthPrograms({
        name: searchQuery,
        type: programType,
        page: page + 1,
        limit,
      });

      const { data, meta, error } = response.data;

      if (!data) throw error;

      setListStrengthPrograms(prev => [
        ...prev,
        ...data.map(item => ({
          copiedAt: item.copied_at,
          finishedAt: item.finished_at,
          id: item.program_id.toString(),
          name: item.name,
          startedAt: item.started_at,
          trainingType: item.training_type,
          type: item.type,
          exercises: item.exercises,
        })),
      ]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListStrengthPrograms(1);
  }, [searchQuery, programType]);

  return {
    loading,
    type: programType,
    page,
    isCoach,
    totalPages,
    searchQuery,
    listStrengthPrograms,
    setPage,
    setType: setProgramType,
    onLoadMore,
    debounceSearch,
    fetchListStrengthPrograms,
  };
};
