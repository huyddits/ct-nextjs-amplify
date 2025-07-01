import { BillingApi } from '@/api';
import { useEffect, useMemo, useState } from 'react';
import { BillingCycle, PlanStatus, PlanType, Platform } from '@/utils/types';
import { useAuthStore } from '@/store';
import { usePagination } from './usePagination';
import { Capacitor } from '@capacitor/core';
import { useRouter } from 'next/navigation';
export type SubscriptionPlan = {
  name: string;
  type: PlanType;
  basePrice: number;
  actualPrice: number;
  billingCycle: BillingCycle;
  status: PlanStatus;
  stripePriceId: string;
  features: string[];
  isPromoApplied?: boolean;
};

export type ActivePlan = {
  name: string;
  userPlanId: string;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
  stripeSubscriptionId: string | null;
  nextBillingDate: string | null;
  startDate: string;
  endDate: string | null;
  status: PlanStatus;
  planId: string;
  planType: PlanType;
  billingCycle: BillingCycle;
  basePrice: number;
  actualPrice: number;
  promoCode: string | null;
};

export type BillingReceipt = {
  amount: number;
  billingId: string;
  billingDate: string; // exp: "2025-05-23T06:26:55.000Z"
  billingReason: string;
  currency: string;
  invoicePdf: string;
  paymentMethod: string;
  stripeInvoiceId: string;
  stripeCustomerId: string;
};

export const useBillingAndSubscription = () => {
  const { info } = useAuthStore();
  const platform = Capacitor.getPlatform();
  const [listBasePlans, setListBasePlans] = useState<SubscriptionPlan[]>([]); // reserved for non-promotion code plans
  const [listCoachPlans, setListCoachPlans] = useState<SubscriptionPlan[]>([]);
  const [listAthletePlans, setListAthletePlans] = useState<SubscriptionPlan[]>([]);
  const [listBillings, setListBillings] = useState<BillingReceipt[]>([]);
  const [listApplied, setListApplied] = useState<string[]>([]);
  const router = useRouter();
  // promo
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);

  const {
    page: billingPage,
    limit,
    totalPages: totalBillingPages,
    setPage: setBillingPage,
    setTotalPages: setTotalBillingPages,
  } = usePagination();

  const currentPlan = useMemo<ActivePlan | null>(() => {
    if (!info?.planId) return null;
    console.log('info', info.planBasePrice);
    return {
      name: info.planName,
      userPlanId: info.userPlanId,
      stripeCustomerId: info.planStripeCustomerId,
      stripePriceId: info.planStripePriceId,
      stripeSubscriptionId: info.planStripeSubscriptionId,
      nextBillingDate: info.planNextBillingDate,
      startDate: info.planStartDate,
      endDate: info.planEndDate,
      status: info.planStatus,
      planId: info.planId,
      planType: info.planType,
      billingCycle: info.planBillingCycle,
      basePrice: info.planBasePrice,
      actualPrice: info.planActualPrice,
      promoCode: info.planPromo,
    };
  }, [info?.planId, info?.planStatus]);

  const handleGetListPlans = async () => {
    try {
      const response = await BillingApi.getSubscriptionPlans({});
      const { data } = response.data;
      if (!data) {
        throw response.data.error;
      }

      const arrayPlans: SubscriptionPlan[] = data.map(item => {
        const { type, billing_cycle, base_price, actual_price, stripe_price_id, name } = item;
        return {
          name,
          basePrice: Number(base_price),
          actualPrice: Number(actual_price),
          billingCycle: billing_cycle,
          status:
            type === currentPlan?.planType && billing_cycle === currentPlan?.billingCycle
              ? PlanStatus.Active
              : PlanStatus.Inactive,
          type: type,
          stripePriceId: stripe_price_id,
          features: item.features.map(({ name }) => name),
          isPromoApplied: false,
        };
      });

      setListBasePlans(arrayPlans);
      setListCoachPlans(arrayPlans?.filter(item => item.type === PlanType.Coach));
      setListAthletePlans(arrayPlans?.filter(item => item.type === PlanType.Athlete));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetBillingHistory = async () => {
    try {
      const response = await BillingApi.getBillingHistory({
        limit,
        page: billingPage,
      });

      if (!response.data.data) {
        throw response.data.error;
      }
      const listData: BillingReceipt[] = response.data.data.map(item => ({
        billingId: item.billing_history_id,
        amount: Number(item.amount),
        billingDate: item.billing_date,
        billingReason: item.billing_reason,
        currency: item.currency,
        invoicePdf: item.invoice_pdf,
        paymentMethod: item.payment_method,
        stripeInvoiceId: item.stripe_invoice_id,
        stripeCustomerId: item.stripe_customer_id,
      }));
      setListBillings(listData);
      setTotalBillingPages(response.data.meta?.totalPages ?? 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyPromotion = async (promotionCode: string) => {
    try {
      const response = await BillingApi.applyPromotionCodeAndPreviewPrices({
        code: promotionCode,
      });
      if (response.data.data?.discount && response.data.data.plans.length) {
        const { plans: data } = response.data.data;
        const arrayPlans = listBasePlans.map(item => {
          const found = data.find(({ stripe_price_id }) => stripe_price_id === item.stripePriceId);
          const actualPrice = found?.actual_price;
          const isPromoApplied = found?.is_applied_promo_code;
          return {
            ...item,
            actualPrice: actualPrice ? Number(actualPrice) : item.basePrice,
            isPromoApplied,
          };
        });

        setListApplied(
          arrayPlans
            .filter(({ isPromoApplied }) => isPromoApplied)
            .map(({ stripePriceId }) => stripePriceId)
        );
        setDiscount(response.data.data.discount);
        setPromoCode(promotionCode);
        setIsPromoCodeApplied(true);
        setListCoachPlans(arrayPlans?.filter(item => item.type === PlanType.Coach));
        setListAthletePlans(arrayPlans?.filter(item => item.type === PlanType.Athlete));
      }
    } catch (error) {
      console.log(error);
      setPromoCode('');
      setIsPromoCodeApplied(false);
      setListCoachPlans(listBasePlans.filter(item => item.type === PlanType.Coach));
      setListAthletePlans(listBasePlans.filter(item => item.type === PlanType.Athlete));
    }
  };

  const handleClearPromotion = () => {
    setPromoCode('');
    setIsPromoCodeApplied(false);
  };

  const handleSubscribePlan = async ({ priceId }: { priceId: string }) => {
    console.log('platform', platform);
    const discounts = listApplied.includes(priceId) ? promoCode : '';
    try {
      const isMobile = platform === 'ios' || platform === 'android';
      const response = await BillingApi.subscribeToAPlan({
        price_id: priceId,
        discounts,
        platform: isMobile ? Platform.mobile : Platform.web,
      });
      if (!response.data.data?.url) {
        throw response.data.error;
      }
      router.push(response.data.data.url);
      // location.href = response.data.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePlan = async ({
    customerId,
    subscriptionId,
  }: {
    customerId: string;
    subscriptionId: string;
  }) => {
    if (!info) {
      console.log('Cannot change plan without info');
      return;
    }
    try {
      const promotionCode = listApplied.includes(subscriptionId) ? promoCode : '';
      const response = await BillingApi.changePlan({
        // promotion_code: promotionCode,
        customer_id: customerId,
        account_type: info.accountType,
        discounts: promotionCode,
      });

      if (!response.data.data?.url) {
        throw response.data.error;
      }

      router.push(response.data.data.url);
      // window.open(response.data.data.url, '_blank');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelPlan = async (activePlan: ActivePlan) => {
    if (!activePlan.stripeSubscriptionId) {
      throw new Error(`Subscription doesn't exist`);
    }
    try {
      const response = await BillingApi.cancelSubscription({
        subscription_id: activePlan.stripeSubscriptionId,
      });
      console.log(response.data);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreBills = async () => {
    setBillingPage(prev => prev + 1);
    const response = await BillingApi.getBillingHistory({
      limit,
      page: billingPage + 1,
    });

    const { data } = response.data;
    if (data?.length) {
      const listData: BillingReceipt[] = data.map(item => ({
        billingId: item.billing_history_id,
        amount: Number(item.amount),
        billingDate: item.billing_date,
        billingReason: item.billing_reason,
        currency: item.currency,
        invoicePdf: item.invoice_pdf,
        paymentMethod: item.payment_method,
        stripeInvoiceId: item.stripe_invoice_id,
        stripeCustomerId: item.stripe_customer_id,
      }));
      setListBillings(prev => [...prev, ...listData]);
    }
  };

  useEffect(() => {
    handleGetListPlans();
    handleGetBillingHistory();
  }, []);

  return {
    currentPlan,
    listBillings,
    listCoachPlans,
    listAthletePlans,
    billingPage,
    totalBillingPages,
    discount,
    promoCode,
    isPromoCodeApplied,

    handleCancelPlan,
    handleChangePlan,
    handleSubscribePlan,
    handleApplyPromotion,
    handleClearPromotion,
    loadMoreBills,
    setBillingPage,
  };
};
