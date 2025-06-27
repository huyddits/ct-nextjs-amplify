import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckOffStatusEnum, CheckOffStudentReview } from '@/api/types/checkOff';
import { ERROR_MESSAGES } from '@/utils/constants';

export const CHECKOFF_SCHEMA = yup.object({
  status: yup
    .mixed<CheckOffStatusEnum>()
    .oneOf(Object.values(CheckOffStatusEnum))
    .required(ERROR_MESSAGES.INPUT),
  coach_review_note: yup.string().default('').max(500, ERROR_MESSAGES.MAX_LENGTH(500)),
});

export function useCheckOffForm(checkOff: CheckOffStudentReview) {
  return useForm<yup.InferType<typeof CHECKOFF_SCHEMA>>({
    defaultValues: {
      status: checkOff.status,
      coach_review_note: checkOff.coach_review_note || '',
    },
    resolver: yupResolver(CHECKOFF_SCHEMA),
    mode: 'onChange',
  });
}
