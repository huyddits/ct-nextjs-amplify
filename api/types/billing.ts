import { ApiResponse, BillingCycle, PlanType } from '@/utils/types';

type PlanFeature = { feature_id: number; name: string };

type SubscriptionPlan = {
  plan_id: string;
  actual_price: string; // "xx.yy"
  base_price: string; // "xx.yy"
  billing_cycle: BillingCycle;
  type: PlanType;
  features: PlanFeature[];
  stripe_payment_link: string | null;
  stripe_price_id: string;
  promo_code: string | null; // need remove
  created_at: string; // need remove
  updated_at: string; // need remove
};

type BillingRecord = {
  billing_history_id: string;
  stripe_invoice_id: string;
  stripe_customer_id: string;
  billing_reason: string;
  amount: string;
  currency: string;
  payment_method: string;
  billing_date: string; // ISO date string
  status: string;
  invoice_pdf: string;
  created_at: string;
  user: {
    account_type: string;
    first_name: string;
    last_name: string;
    email: string;
    stripe_customer_id: string;
    is_active: boolean;
    created_at: string;
  };
};

export type GetSubscriptionPlansParams = {};

export type GetSubscriptionPlansResponse = ApiResponse<Array<SubscriptionPlan>, {}>;

export type AddPromotionCodePayload = {
  code: string;
};

export type AddPromotionCodeResponse = ApiResponse<{}, {}>;

export type GetBillingHistoryParams = {
  page?: number;
  limit?: number;
  // sortBy?: string; // ?
  // searchBy?: string;
  // search?: string;
  // filter?: string;
  // select?: string;
  // cursor?: string;
  // path?: string;
};

export type GetBillingHistoryResponse = ApiResponse<BillingRecord[], {}>;

export type CreateSubscriptionSessionPayload = {
  price_id: string;
};

export type CreateSubscriptionSessionResponse = ApiResponse<{
  url: string;
}>;

export type CancelSubscriptionPayload = {
  subscription_id: string;
};

export type CancelSubscriptionResponse = ApiResponse<{}, {}>;

export type PreviewSubscriptionChangePayload = {
  customer_id: string;
  subscription_id: string;
  new_plan_id: string;
};

export type PreviewSubscriptionChangeResponse = ApiResponse<{}, {}>;

export type ChangePlanPayload = {
  customer_id: string;
  subscription_id: string;
  new_price_id: string;
};

export type ChangePlanResponse = ApiResponse<{}, {}>;
