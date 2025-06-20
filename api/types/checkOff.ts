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
