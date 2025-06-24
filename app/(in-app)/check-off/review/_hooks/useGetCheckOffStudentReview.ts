import { getCheckOffStudentReview, updateCheckOffStudentReview } from '@/api/checkOff.api';
import { UpdateCheckOffStudentReviewBody } from '@/api/types/checkOff';
import useSWRMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite';

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
      const { data } = await getCheckOffStudentReview({ page: Number(key?.[1] || 1), limit: 10 });
      return data;
    },
    {
      dedupingInterval: 1000, // 1 second,
      initialSize: 1,
      revalidateFirstPage: false,
      parallel: true,
      persistSize: false,
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
        // mutate((key: string | string[]) => {
        //   if (typeof key === 'string') {
        //     return key === CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_KEY;
        //   }
        //   if (Array.isArray(key))
        //     return key.includes(CHECK_OFF_STUDENT_REVIEW.CHECK_OFF_STUDENT_REVIEW_KEY);
        // });
      },
    }
  );
}
