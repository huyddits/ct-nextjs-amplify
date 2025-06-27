import useSWR from 'swr';
import { getCheckOffList } from '@/api/checkOff.api';

export const useCheckOffList = (params?: { page?: number; limit?: number }) => {
  return useSWR(['CHECK_OFF_LIST', params], async () => {
    const response = await getCheckOffList(params);
    return response.data;
  });
};
