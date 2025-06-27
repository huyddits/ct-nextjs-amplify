import { ERROR_MESSAGES } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

export interface CheckOffSubmission {
  submit_id: string;
  note?: string;
}

export const CHECKOFF_SUBMISSION_SCHEMA = object().shape({
  submit_id: string().required(ERROR_MESSAGES.INPUT),
  note: string().optional(),
});

export const useCheckoffSubmission = () => {
  return useForm({
    resolver: yupResolver(CHECKOFF_SUBMISSION_SCHEMA),
    defaultValues: {
      submit_id: '',
      note: '',
    },
    mode: 'onChange',
  });
};
