'use client';
import { useBillingAndSubscription, type SubscriptionPlan } from '@/hooks';
import {
  CurrentPlanCard,
  PromoCode,
  PaymentMethod,
  BillingHistoryBlock,
  PlanFeatured,
  AvailablePlanBlock,
} from './_components';
import { convertToPlanName } from '@/utils/converter';
import { useEffect, useRef, useState } from 'react';
import { useConfirmStore } from '@/store';
import { BillingCycle, PlanType } from '@/utils/types';

export default function BillingAndSubscriptionPage() {
  const { confirm } = useConfirmStore();
  const {
    currentPlan,
    listAthletePlans,
    listCoachPlans,
    listBillings,
    billingPage,
    totalBillingPages,
    onCancelPlan,
    onChangePlan,
    loadMoreBills,
    onApplyPromotion,
    onCreateSubscriptionSession,
  } = useBillingAndSubscription();
  const availablePlansRef = useRef<HTMLDivElement>(null);

  // stripe
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const onSwitch = (plan: SubscriptionPlan) => {
    console.log('🚀 ~ onSwitch ~ plan:', plan);
    confirm({
      title: 'Switch Plan',
      description: 'Are you sure you want to switch to this plan?',
      confirmTitle: 'Switch',
      onConfirm: () => {
        const hasPlan =
          currentPlan?.stripePriceId &&
          currentPlan?.stripeSubscriptionId &&
          currentPlan.billingCycle !== BillingCycle.Free;
        if (currentPlan?.billingCycle === BillingCycle.Free) {
          // from free to paid
          onCreateSubscriptionSession({ priceId: plan.stripePriceId });
        } else if (hasPlan) {
          // from paid to paid
          onChangePlan({
            priceId: currentPlan.stripePriceId!,
            customerId: currentPlan.stripeCustomerId!,
            subscriptionId: currentPlan.stripeSubscriptionId!,
          });
        }
      },
    });
  };

  const onSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
  };

  useEffect(() => {
    if (!currentPlan) {
      console.log('No current plan found');
      return;
    }

    let found: SubscriptionPlan | undefined;
    const isMatched = (item: SubscriptionPlan) =>
      item.billingCycle === currentPlan.billingCycle || item.billingCycle === BillingCycle.Free;
    if (currentPlan.planType === PlanType.Coach) {
      found = listCoachPlans.find(isMatched);
    } else {
      found = listAthletePlans.find(isMatched);
    }
    found && setSelectedPlan(found);
  }, [currentPlan, listCoachPlans, listAthletePlans]);

  const onScrollDownToListPlans = () => {
    const element = availablePlansRef.current;
    if (!element) return console.log('element not found');
    const yOffset = -70;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  return (
    <div className="p-6 grid grid-cols-1 gap-4 container">
      {currentPlan && (
        <CurrentPlanCard
          price={currentPlan.actualPrice}
          billingCycle={currentPlan.billingCycle}
          name={convertToPlanName(currentPlan.planType, currentPlan.billingCycle)}
          status={currentPlan.status}
          className="col-span-1 row-span-1"
          nextBillingDate={currentPlan.nextBillingDate}
          onChangePlan={onScrollDownToListPlans}
          onCancelPlan={() => onCancelPlan(currentPlan)}
        />
      )}
      <PromoCode className="col-span-1 row-span-1" onApply={onApplyPromotion} />
      {currentPlan && selectedPlan && (
        <AvailablePlanBlock
          ref={availablePlansRef}
          className="row-span-3"
          currentPlan={{
            name: convertToPlanName(currentPlan.planType, currentPlan.billingCycle),
            actualPrice: currentPlan.actualPrice,
            basePrice: currentPlan.basePrice,
            billingCycle: currentPlan.billingCycle,
            status: currentPlan.status,
            type: currentPlan.planType,
          }}
          athletePlans={listAthletePlans}
          coachPlans={listCoachPlans}
          selectedPlan={selectedPlan}
          onSwitch={onSwitch}
          onselect={onSelect}
        />
      )}
      <PaymentMethod className="col-span-1" />
      <BillingHistoryBlock
        listBillings={listBillings}
        page={billingPage}
        totalPages={totalBillingPages}
        onLoadMore={loadMoreBills}
      />
      {!!selectedPlan?.features.length && <PlanFeatured listItems={selectedPlan?.features} />}
      <div className="padding-bottom-app" />
    </div>
  );
}
