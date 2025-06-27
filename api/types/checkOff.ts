import { ApiResponse } from '@/utils/types';

export type CheckOffTask = {
  assigned_task: string;
  assigned_date: string;
  due_date: string;
  notes: string;
  assigned_to: string[];
  completed: string[];
  not_complete: string[];
  excused: string[];
  days_open?: number;
};

export type CheckOffDataResponse = ApiResponse<CheckOffTask[]>;

export type MonthlyRateByWeek = {
  name: string;
  monthlyRate: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
};

export type CheckOffReferenceResponse = ApiResponse<MonthlyRateByWeek[]>;

export type CheckOffStudentReviewAthlete = {
  account_type: string;
  email: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profile: {
    first_name: string;
    last_name: string;
  };
};

export type CheckOffStudentReviewCoach = {
  account_type: string;
  email: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export enum CheckOffStatusEnum {
  Completed = 'completed',
  NotCompleted = 'not_completed',
  Excused = 'excused',
}

export enum CheckOffSubmitStatusEnum {
  NotSubmitted = 'not_submitted',
  Submitted = 'submitted',
  DidNotSubmit = 'did_not_submit',
}

export type CheckOffStudentReview = {
  submit_id: number;
  due_date: string;
  submitted_date: string | null;
  media_link: string;
  note: string;
  status: CheckOffStatusEnum;
  status_objective: number;
  coach_review_note: string;
  status_review_date: string;
  created_at: string;
  updated_at: string;
  coach: CheckOffStudentReviewCoach;
  athlete: CheckOffStudentReviewAthlete;
  checkoff: CheckOffStudent;
};

export type CheckOffStudent = {
  assigned_task: string;
  note: string;
};
export type CheckOffStudentReviewResponse = ApiResponse<CheckOffStudentReview[]>;

export type UpdateCheckOffStudentReviewBody = {
  submit_id: number;
  status: CheckOffStatusEnum;
  coach_review_note: string;
};

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

export type CheckOffByAthleteItem = {
  checkoff_name: string;
  due_date: string;
  due_date_raw: string;
  submitted_date?: string;
  status?: CheckOffStatusEnum;
  notes: string;
};

export type CheckOffByAthleteData = {
  percent_completion: number;
  data: CheckOffByAthleteItem[];
};

export type CheckOffByAthleteResponse = ApiResponse<CheckOffByAthleteData>;

export type CheckOffDateParams = {
  month: number;
  year: number;
};

export type SubmitCheckOffPayload = {
  submit_id: number;
  note: string;
  file?: File; // File object for FormData
};

export type SubmitCheckOffResponse = ApiResponse<{
  message: string;
  submit_id: string;
}>;

export type CheckOffListItem = {
  submit_id: number;
  assigned_task: string;
  due_date: string;
  status: CheckOffStatusEnum;
  note: string;
  created_at: string;
  updated_at: string;
};

export type CheckOffListResponse = ApiResponse<CheckOffListItem[]>;
