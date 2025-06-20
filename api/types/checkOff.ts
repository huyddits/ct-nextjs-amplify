import { ApiResponse } from '@/utils/types';

export type CreateCheckOffPayload = {
  assigned_date: string;
  due_date: string;
  assigned_task: string;
  note: string;
  receivers: receiversItem[];
};

export type receiversItem = {
  user_id: string;
};

export type CreateCheckOffResponse = ApiResponse<{}, {}>;
