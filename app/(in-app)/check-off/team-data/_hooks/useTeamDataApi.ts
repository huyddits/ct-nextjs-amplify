import useSWR from 'swr';
import {
  getTeamDataCheckOff,
  getCheckOffReference,
  getCheckOffByAthlete,
} from '@/api/checkOff.api';
import { CheckOffDateParams } from '@/api/types/checkOff';

export const TEAM_DATA_CHECK_OFF = {
  TEAM_DATA_CHECK_OFF_KEY: 'TEAM_DATA_CHECK_OFF_KEY',
  CHECK_OFF_REFERENCE_KEY: 'CHECK_OFF_REFERENCE_KEY',
  BY_ATHLETE_KEY: 'BY_ATHLETE_KEY',
};

export const useTeamDataCheckOff = (selectedDate?: CheckOffDateParams) => {
  const enabledKey = selectedDate
    ? [TEAM_DATA_CHECK_OFF.TEAM_DATA_CHECK_OFF_KEY, selectedDate]
    : null;
  return useSWR(enabledKey, async () => {
    const { data } = await getTeamDataCheckOff(selectedDate!);
    return data.data;
  });
};

export const useCheckOffReference = (selectedDate?: CheckOffDateParams) => {
  const enabledKey = selectedDate
    ? [TEAM_DATA_CHECK_OFF.CHECK_OFF_REFERENCE_KEY, selectedDate]
    : null;
  return useSWR(enabledKey, async () => {
    const { data } = await getCheckOffReference(selectedDate!);
    return data.data;
  });
};

export const useCheckOffByAthlete = (athleteId = '', selectedDate?: CheckOffDateParams) => {
  console.log(athleteId, selectedDate);
  const enabledKey =
    athleteId && selectedDate
      ? [TEAM_DATA_CHECK_OFF.BY_ATHLETE_KEY, athleteId, selectedDate]
      : null;
  return useSWR(enabledKey, async () => {
    const { data } = await getCheckOffByAthlete(athleteId, selectedDate!);
    return data.data;
  });
};
