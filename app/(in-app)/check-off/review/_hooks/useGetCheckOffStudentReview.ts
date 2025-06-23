import useSWR from 'swr';
import { getCheckOffStudentReview, updateCheckOffStudentReview } from '@/api/checkOff.api';
import { PaginationParams } from '@/utils/types';
import { UpdateCheckOffStudentReviewBody } from '@/api/types/checkOff';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';

export const CHECK_OFF_STUDENT_REVIEW = {
  CHECK_OFF_STUDENT_REVIEW_KEY: 'CHECK_OFF_STUDENT_REVIEW_KEY',
  CHECK_OFF_STUDENT_REVIEW_UPDATE: 'CHECK_OFF_STUDENT_REVIEW_UPDATE',
};

export function useGetCheckOffStudentReview(params: PaginationParams) {
  return useSWR([CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_KEY, params], async () => {
    const { data } = await getCheckOffStudentReview(params);
    return data.data;
  });
}

export function useUpdateCheckOffStudentReview() {
  return useSWRMutation<any, Error, string, UpdateCheckOffStudentReviewBody>(
    CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_UPDATE,
    async (_key, { arg }) => {
      const { data } = await updateCheckOffStudentReview(arg);
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Review updated successfully');
        // mutate((key: string | string[]) => {
        //   if (typeof key === 'string') {
        //     return key === CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_KEY;
        //   }
        //   if (Array.isArray(key))
        //     return key.includes(CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_KEY);
        // });
      },
      onError: () => {
        toast.error('Failed to update review');
      },
    }
  );
}
