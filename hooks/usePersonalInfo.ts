import { UserApi } from '@/api';
import { useAuthStore } from '@/store';
import { WHITE_LIST } from '@/utils/constants';
import { BillingCycle, PlanStatus, PlanType } from '@/utils/types';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const usePersonalInfo = () => {
  const pathname = usePathname();
  const { info, setInfo, token } = useAuthStore();

  const handleGetPersonalInfo = async () => {
    try {
      const response = await UserApi.getPersonalInfo();
      const { data } = response.data;
      if (!data) {
        throw response.data.error;
      }

      const foundPlan = data.plan.find(({ status }) =>
        [PlanStatus.Active, PlanStatus.Canceled].includes(status)
      );

      console.log({ foundPlan });
      // TODO(ducnm): need to remove after BE fix

      setInfo({
        id: data.user_id,
        accountType: data.account_type,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        isActive: data.is_active,
        createdAt: data.created_at,
        profileId: data.profile?.profile_id ?? '',
        dateOfBirth: data.profile?.date_of_birth ?? '',
        measurementUnit: data.profile?.measurement_unit ?? '',
        roleId: data.profile?.role?.id ?? 0,
        roleName: data.profile?.role?.name ?? '',
        cheerTypeId: data.profile?.cheer_types?.[0]?.id ?? 0,
        cheerTypeName: data.profile?.cheer_types?.[0]?.name ?? '',
        cheerStyleId: data.profile?.cheer_styles?.[0]?.id ?? 0,
        cheerStyleName: data.profile?.cheer_styles?.[0]?.name ?? '',
        equipmentIds: data.equipments?.map(e => e.id) ?? [],
        userPlanId: foundPlan?.user_plan_id ?? '',
        planName: foundPlan?.plan.name ?? '',
        planId: foundPlan?.plan.plan_id ?? '',
        planEndDate: foundPlan?.end_date ?? '',
        planStartDate: foundPlan?.start_date ?? '',
        planNextBillingDate: foundPlan?.next_billing_date ?? '',
        planStatus: foundPlan?.status ?? PlanStatus.Active,
        planActualPrice: Number(foundPlan?.plan.actual_price),
        planBasePrice: Number(foundPlan?.plan.base_price),
        planBillingCycle: foundPlan?.plan.billing_cycle ?? BillingCycle.Free,
        planType: foundPlan?.plan.type ?? PlanType.Athlete,
        planPromo: foundPlan?.plan.promo_code ?? '',
        planStripePriceId: foundPlan?.plan.stripe_price_id ?? '',
        planStripeCustomerId: data.stripe_customer_id,
        planStripeSubscriptionId: data?.stripe_subscription_id ?? '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!token) return;
    handleGetPersonalInfo();
  }, [token]);

  useEffect(() => {
    const windowFocusHandler = () => {
      if (WHITE_LIST.includes(pathname)) {
        return;
      }
      handleGetPersonalInfo();
    };
    addEventListener('focus', windowFocusHandler);
    return () => {
      removeEventListener('focus', windowFocusHandler);
    };
  }, [pathname]);

  return { data: info, refetch: handleGetPersonalInfo };
};
