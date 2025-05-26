import {
  AccountType,
  ApiResponse,
  BillingCycle,
  MeasurementUnit,
  PlanStatus,
  PlanType,
} from '@/utils/types';

type PlanInfo = {
  plan_id: string;
  type: PlanType; // tighten if enum is known
  billing_cycle: BillingCycle; // adjust if more values exist
  base_price: string; // assuming price as string for fixed-precision
  actual_price: string;
  stripe_price_id: string;
  stripe_payment_link: string | null;
  promo_code: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string;
  features: any[];
};

type PlanSubscription = {
  user_plan_id: string;
  stripe_subscription_id: string | null;
  next_billing_date: null;
  start_date: string;
  end_date: null;
  status: PlanStatus;
  created_at: string;
  updated_at: string;
  plan: PlanInfo;
};

export type CreateUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string; // YYYY-MM-DD;
  cheer_type_id: number;
  cheer_style_id: number;
  role_id: number;
  equipment_ids: number[];
  account_type: AccountType;
  measurement_unit: MeasurementUnit;
};

export type CreateUserResponse = ApiResponse<
  {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  },
  {}
>;

export type ForgotPasswordPayload = {
  email: string;
  captcha: string;
};

export type ForgotPasswordResponse = ApiResponse<
  {
    token: string;
  },
  {
    email: string;
  }
>;

export type ResetPasswordPayload = {
  token: string;
  new_password: string;
};

export type PersonalInfoResponse = ApiResponse<
  {
    user_id: string;
    account_type: AccountType;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    created_at: string;
    stripe_customer_id: string;
    profile: {
      profile_id: string;
      date_of_birth: string;
      measurement_unit: string;
      role: {
        id: number;
        name: string;
      };
      cheer_types: [
        {
          id: number;
          name: string;
        },
      ];
      cheer_styles: [
        {
          id: number;
          name: string;
        },
      ];
    };
    equipments: [
      {
        id: number;
        name: string;
      },
    ];
    plan: PlanSubscription[];
  },
  {}
>;
