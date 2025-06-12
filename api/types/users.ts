import type {
  AccountType,
  ApiResponse,
  BillingCycle,
  MeasurementUnit,
  PlanStatus,
  PlanType,
} from '@/utils/types';

type PlanInfo = {
  name: string;
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
  start_date: string;
  status: PlanStatus;
  created_at: string;
  updated_at: string;
  plan: PlanInfo;
  next_billing_date: string | null;
  end_date: string | null;
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
  school_name: string;
  // measurement_unit: MeasurementUnit;
  measurement_unit_id: number;
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

export type UserProfile = {
  profile_id: string;
  date_of_birth: string;
  measurement_unit: MeasurementUnit;
  coach_code: string;
  first_name: string;
  last_name: string;
  role_id: number;
  role_name: string;
  cheer_style_id: number;
  cheer_style_name: string;
  cheer_type_id: number;
  cheer_type_name: string;
  measurement_unit_id: number;
  measurement_unit_name: string;
  measurement_unit_type: string;
  school_name: string;
};

export type GetPersonalInfoResponse = ApiResponse<
  {
    user_id: string;
    account_type: AccountType;
    email: string;
    is_active: boolean;
    created_at: string;
    stripe_customer_id: string;
    stripe_subscription_id: string | null;
    profile: UserProfile;
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

export type UpdatePersonalInfoPayload = {
  first_name: string;
  last_name: string;
  school_name: string;
  date_of_birth: string; // exp: "2025-06-03T09:40:39.093Z",
  cheer_type_id: number;
  cheer_style_id: number;
  role: number;
  coach_code?: string;
  // measurement_unit_id: MeasurementUnit;
  measurement_unit_id: number;
  equipments: number[];
};

export type UpdatePersonalInfoResponse = ApiResponse<
  {
    email: string;
    profile_id: string;
    first_name: string;
    last_name: string;
    school_name: string;
    date_of_birth: string; // ISO 8601 string
    coach_code: string;
    measurement_unit: { id: number; name: string; type: string };
    cheer_types: { name: string; id: number }[];
    cheer_styles: { name: string; id: number }[];
    role: { name: string; id: number };
    equipments: { name: string; id: number }[];
  },
  {}
>;
