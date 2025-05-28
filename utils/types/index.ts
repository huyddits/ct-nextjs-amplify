export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type Meta = Pagination; // other meta data can be added

export interface ApiResponse<T, K = undefined> {
  status: string;
  message: string;
  data?: T;
  meta?: Meta;
  error?: {
    code: string;
    details: K extends undefined ? unknown : K;
  };
}

export enum SocialProvider {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Twitter = 'TWITTER',
}

export enum AccountType {
  Athlete = 'athlete',
  Coach = 'coach',
}

export enum MeasurementUnit {
  Imperial = 'imperial',
  Metric = 'metric',
}

export type PersonalInfo = {
  id: string;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  profileId: string;
  dateOfBirth: string;
  measurementUnit: string;
  roleId: number;
  roleName: string;
  cheerTypeId: number;
  cheerTypeName: string;
  cheerStyleId: number;
  cheerStyleName: string;
  equipmentIds: number[];
  userPlanId: string;
  planId: string;
  planName: string;
  planType: PlanType;
  planStatus: PlanStatus;
  planStartDate: string;
  planEndDate: string | null;
  planNextBillingDate: string | null;
  planBasePrice: number;
  planActualPrice: number;
  planBillingCycle: BillingCycle;
  planStripePriceId: string;
  planStripeCustomerId: string | null;
  planStripeSubscriptionId: string | null;
  planPromo: string | null;
} | null;

export enum BillingCycle {
  Free = 'FREE',
  Monthly = 'MONTHLY',
  ThreeMonths = 'THREE_MONTHS',
  Annual = 'ANNUAL',
}

export enum PlanType {
  Coach = 'COACH_PLAN',
  Athlete = 'ATHLETE_PLAN',
}

export enum PlanStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED', // when subscription is canceled but not expired yet
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Inactive = 'INACTIVE', // fe self-declare type to markup which plan can be switched
}
