import useSWRMutation from 'swr/mutation';
import { getCheckOffList, submitCheckOff } from '@/api/checkOff.api';
import useSWR from 'swr';

const STUDENT_CHECK_OFF_KEY = {
  CHECK_OFF_SUBMIT: 'STUDENT_CHECK_OFF_KEY_CHECK_OFF_SUBMIT',
  CHECK_OFF_LIST: 'STUDENT_CHECK_OFF_KEY_CHECK_OFF_LIST',
};
export const useCheckOffSubmit = () => {
  return useSWRMutation(
    STUDENT_CHECK_OFF_KEY.CHECK_OFF_SUBMIT,
    async (_, { arg }: { arg: FormData }) => {
      const response = await submitCheckOff(arg);
      return response.data;
    }
  );
};

export const useStudentCheckOffList = () => {
  return useSWR([STUDENT_CHECK_OFF_KEY.CHECK_OFF_LIST], async () => {
    const { data } = await getCheckOffList({});
    return data.data;
  });
};
