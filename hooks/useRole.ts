import { useAuthStore } from '@/store';
import { useMemo } from 'react';

export const useRole = () => {
  const { info } = useAuthStore();

  return useMemo(
    () => ({
      isCoach: info?.roleName === 'Coach',
      isAthlete: info?.roleName === 'Athlete',
    }),
    [info]
  );
};
