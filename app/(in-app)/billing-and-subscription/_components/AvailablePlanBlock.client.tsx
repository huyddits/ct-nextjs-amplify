'use client';
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { PlanCard } from './PlanCard.client';
import { type SubscriptionPlan } from '@/hooks';
import { AccountType, BillingCycle } from '@/utils/types';
import { useAuthStore } from '@/store';
interface AvailablePlanBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  coachPlans: SubscriptionPlan[];
  athletePlans: SubscriptionPlan[];
  currentPlan: Omit<SubscriptionPlan, 'features' | 'stripePriceId'>;
  selectedPlan: SubscriptionPlan;
  promoCode?: string;
  promoApplied?: boolean;
  onSwitch?: (plan: SubscriptionPlan) => void;
  onselect?: (plan: SubscriptionPlan) => void;
}

export default forwardRef<HTMLDivElement, AvailablePlanBlockProps>(
  (
    {
      className,
      coachPlans,
      currentPlan,
      athletePlans,
      selectedPlan,
      promoCode,
      promoApplied,
      onSwitch,
      onselect,
      ...otherProps
    }: AvailablePlanBlockProps,
    ref
  ) => {
    const { info } = useAuthStore();

    const isCurrentPlan = (item: SubscriptionPlan) => {
      return currentPlan.type === item.type && currentPlan.billingCycle === item.billingCycle;
    };

    const isSelectedPlan = (item: SubscriptionPlan) => {
      return selectedPlan.type === item.type && selectedPlan.billingCycle === item.billingCycle;
    };
    return (
      <div
        ref={ref}
        className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}
        {...otherProps}
      >
        <h2 className="text-sm text-gray-600 mb-3">Available Plans</h2>

        <div className="space-y-4">
          {info?.accountType === AccountType.Coach && (
            <section className="space-y-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider mt-2">
                Coach Plans
              </h3>
              {coachPlans
                .filter(item => {
                  if (currentPlan.billingCycle === BillingCycle.Free) {
                    return item;
                  } else {
                    return item.billingCycle !== BillingCycle.Free;
                  }
                })
                .map(item => (
                  <PlanCard
                    key={item.name}
                    planName={item.name}
                    planType={item.type}
                    actualPrice={item.actualPrice}
                    basePrice={item.basePrice}
                    billingCycle={item.billingCycle}
                    isCurrent={isCurrentPlan(item)}
                    isSelected={isSelectedPlan(item)}
                    isPromoApplied={item.isPromoApplied}
                    onSwitch={() => onSwitch?.(item)}
                    onSelect={() => onselect?.(item)}
                    promoApplied={promoApplied}
                    promoCode={promoCode}
                    showRibbon={item.billingCycle === BillingCycle.Annual}
                  />
                ))}
            </section>
          )}

          {info?.accountType === AccountType.Athlete && (
            <section className="space-y-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider mt-4">
                Athlete Plans
              </h3>
              {athletePlans
                .filter(item => {
                  if (currentPlan.billingCycle === BillingCycle.Free) {
                    return item;
                  } else {
                    return item.billingCycle !== BillingCycle.Free;
                  }
                })
                .map(item => (
                  <PlanCard
                    key={item.name}
                    planName={item.name}
                    planType={item.type}
                    actualPrice={item.actualPrice}
                    basePrice={item.basePrice}
                    billingCycle={item.billingCycle}
                    isCurrent={isCurrentPlan(item)}
                    isSelected={isSelectedPlan(item)}
                    isPromoApplied={item.isPromoApplied}
                    onSwitch={() => onSwitch?.(item)}
                    onSelect={() => onselect?.(item)}
                    promoApplied={promoApplied}
                    promoCode={promoCode}
                    showRibbon={item.billingCycle === BillingCycle.Annual}
                  />
                ))}
            </section>
          )}
        </div>

        <div className="text-xs text-gray-600 mt-3">
          All plans automatically renew until canceled. You can cancel anytime.
        </div>
      </div>
    );
  }
);
