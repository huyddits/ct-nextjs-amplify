import { useAuthStore } from '@/store';
import { AccountType } from '@/utils/types';
import { useMemo } from 'react';

export const useRole = () => {
  const { info } = useAuthStore();

  return useMemo(
    () => ({
      isCoach: info?.accountType === AccountType.Coach,
      isAthlete: info?.accountType === AccountType.Athlete,
    }),
    [info]
  );
};
