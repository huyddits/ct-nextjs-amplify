import { getCheckOffStudentReview, updateCheckOffStudentReview } from '@/api/checkOff.api';
import { PaginationParams } from '@/utils/types';
import { UpdateCheckOffStudentReviewBody } from '@/api/types/checkOff';
import useSWRMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite';
import { toast } from 'react-toastify';

export const CHECK_OFF_STUDENT_REVIEW = {
  CHECK_OFF_STUDENT_REVIEW_KEY: 'CHECK_OFF_STUDENT_REVIEW_KEY',
  CHECK_OFF_STUDENT_REVIEW_UPDATE: 'CHECK_OFF_STUDENT_REVIEW_UPDATE',
};

export function useGetCheckOffStudentReview() {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && pageIndex + 1 > previousPageData.meta?.totalPages) return null;
      return [CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_KEY, pageIndex + 1];
    },
    async (key: string[]) => {
      const { data } = await getCheckOffStudentReview({ page: Number(key?.[1] || 1), limit: 2 });
      return data;
    },
    {
      parallel: true,
      revalidateFirstPage: false,
    }
  );
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
