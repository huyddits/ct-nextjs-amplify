import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import {
  AddPromotionCodePayload,
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
  PreviewSubscriptionChangePayload,
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

export const addPromotionCode = (payload: AddPromotionCodePayload) => {
  return axiosIns.post<AddPromotionCodeResponse>(END_POINTS.BILLING_ADD_PROMOTION_CODE, payload);
};

export const createSubscriptionSession = (payload: CreateSubscriptionSessionPayload) => {
  return axiosIns.post<CreateSubscriptionSessionResponse>(
    END_POINTS.SUBSCRIPTION_CREATE_SESSION,
    payload
  );
};

export const cancelSubscription = (payload: CancelSubscriptionPayload) => {
  return axiosIns.post(END_POINTS.SUBSCRIPTION_CANCEL, payload);
};

export const previewPlanChange = (payload: PreviewSubscriptionChangePayload) => {
  return axiosIns.post(END_POINTS.SUBSCRIPTION_CHANGE_PREVIEW);
};

export const changePlan = (payload: ChangePlanPayload) => {
  return axiosIns.post<ChangePlanResponse>(END_POINTS.SUBSCRIPTION_CHANGE, payload);
};
