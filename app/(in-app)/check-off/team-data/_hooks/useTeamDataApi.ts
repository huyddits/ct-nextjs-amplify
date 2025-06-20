import useSWR from 'swr';
import { getTeamDataCheckOff, getCheckOffReference } from '@/api/checkOff.api';

export const TEAM_DATA_CHECK_OFF = {
  TEAM_DATA_CHECK_OFF_KEY: 'TEAM_DATA_CHECK_OFF_KEY',
  CHECK_OFF_REFERENCE_KEY: 'CHECK_OFF_REFERENCE_KEY',
};

export const useTeamDataCheckOff = (selectedDate?: string) => {
  const enabledKey = selectedDate
    ? [TEAM_DATA_CHECK_OFF.TEAM_DATA_CHECK_OFF_KEY, selectedDate]
    : null;
  return useSWR(enabledKey, async () => {
    const { data } = await getTeamDataCheckOff(selectedDate);
    return data.data;
  });
};

export const useCheckOffReference = (selectedDate?: string) => {
  const enabledKey = selectedDate
    ? [TEAM_DATA_CHECK_OFF.CHECK_OFF_REFERENCE_KEY, selectedDate]
    : null;
  return useSWR(enabledKey, async () => {
    const { data } = await getCheckOffReference(selectedDate);
    return data.data;
  });
};
