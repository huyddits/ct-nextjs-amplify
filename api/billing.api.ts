import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import {
  AddPromotionCodeParams,
  AddPromotionCodeResponse,
  CancelSubscriptionPayload,
  ChangePlanPayload,
  ChangePlanResponse,
  CreateSubscriptionSessionPayload,
  CreateSubscriptionSessionResponse,
  GetBillingHistoryParams,
  GetBillingHistoryResponse,
  GetSubscriptionPlansParams,
  GetSubscriptionPlansResponse,
} from './types/billing';

export const getSubscriptionPlans = (params: GetSubscriptionPlansParams) => {
  return axiosIns.get<GetSubscriptionPlansResponse>(END_POINTS.SUBSCRIPTION_PLANS, {
    params,
  });
};

export const getBillingHistory = (params: GetBillingHistoryParams) => {
  return axiosIns.get<GetBillingHistoryResponse>(END_POINTS.BILLING_HISTORY, {
    params,
  });
};

export const applyPromotionCodeAndPreviewPrices = ({ code }: AddPromotionCodeParams) => {
  return axiosIns.get<AddPromotionCodeResponse>(END_POINTS.VALIDATE_PROMOTION_CODE, {
    params: { code },
  });
};

export const subscribeToAPlan = (payload: CreateSubscriptionSessionPayload) => {
  return axiosIns.post<CreateSubscriptionSessionResponse>(
    END_POINTS.SUBSCRIPTION_SUBSCRIBE_PLAN,
    payload
  );
};

export const cancelSubscription = (payload: CancelSubscriptionPayload) => {
  return axiosIns.post(END_POINTS.SUBSCRIPTION_CANCEL, payload);
};

export const changePlan = (payload: ChangePlanPayload) => {
  return axiosIns.post<ChangePlanResponse>(END_POINTS.SUBSCRIPTION_CHANGE, payload);
};
