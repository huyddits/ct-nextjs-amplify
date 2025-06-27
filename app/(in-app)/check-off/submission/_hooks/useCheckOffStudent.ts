import useSWRMutation from 'swr/mutation';
import { submitCheckOff } from '@/api/checkOff.api';

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
