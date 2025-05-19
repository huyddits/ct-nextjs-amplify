'use client';
import {
  CurrentPlanCard,
  PromoCode,
  PaymentMethod,
  BillingHistory,
  PlanFeatured,
  AvailablePlanBlock,
} from './_components';

export default function BillingAndSubscriptionPage() {
  return (
    <div className="p-6 grid grid-cols-1 gap-4">
      <CurrentPlanCard className="col-span-1 row-span-1" />
      <PromoCode className="col-span-1 row-span-1" />
      <AvailablePlanBlock className="row-span-3" />
      <PaymentMethod className="col-span-1" />
      <BillingHistory />
      <PlanFeatured
        listItems={[
          'Unlimited team members',
          'Advanced analytics and reporting',
          'Custom training programs',
        ]}
      />
      <div className="padding-bottom-app" />
    </div>
  );
}
