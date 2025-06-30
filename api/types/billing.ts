import { AccountType, ApiResponse, BillingCycle, PlanType, Platform } from '@/utils/types';

type PlanFeature = { feature_id: number; name: string };

type SubscriptionPlan = {
  name: string;
  plan_id: string;
  actual_price: string; // "xx.yy"
  base_price: string; // "xx.yy"
  billing_cycle: BillingCycle;
  type: PlanType;
  features: PlanFeature[];
  stripe_payment_link: string | null;
  stripe_price_id: string;
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

export type AddPromotionCodeParams = {
  code: string;
};

export type AddPromotionCodeResponse = ApiResponse<
  {
    discount: number;
    plans: (SubscriptionPlan & { is_applied_promo_code: boolean })[];
  },
  {}
>;

export type GetBillingHistoryParams = {
  page?: number;
  limit?: number;
};

export type GetBillingHistoryResponse = ApiResponse<BillingRecord[], {}>;

export type CreateSubscriptionSessionPayload = {
  price_id: string;
  discounts: string;
  platform: Platform;
};

export type CreateSubscriptionSessionResponse = ApiResponse<{
  url: string;
}>;

export type CancelSubscriptionPayload = {
  subscription_id: string;
};

export type CancelSubscriptionResponse = ApiResponse<{}, {}>;

export type ChangePlanPayload = {
  customer_id: string;
  account_type: AccountType;
  discounts: string;
  // subscription_id: string;
  // promotion_code: string[];
};

export type ChangePlanResponse = ApiResponse<{
  configuration: string;
  created: number;
  customer: string;
  flow: any;
  id: string;
  livemode: false;
  locale: any;
  object: string;
  on_behalf_of: any;
  return_url: string;
  url: string;
}>;
