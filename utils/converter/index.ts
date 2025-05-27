import { BillingCycle, PlanType } from '../types';
import * as $f from '@/utils/formatter';

export const safeParseInt = (value: string) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const transformToOption = (
  source: { [key: string]: any },
  keyLabel: string,
  keyValue: string
) => {
  return {
    label: source[keyLabel],
    value: source[keyValue],
  };
};

export const convertToPlanName = (planType: PlanType, billingCycle: BillingCycle) => {
  const planTypeName = planType === PlanType.Athlete ? 'Athlete' : 'Coach';
  const billingCycleName = $f.capitalize(billingCycle.replace('_', ' '));
  return `${planTypeName} ${billingCycleName}`;
};

export const convertToBillingText = (billingCycle: BillingCycle) => {
  if (billingCycle === BillingCycle.Free) {
    return 'No billing required';
  }

  let text = '';
  if (billingCycle === BillingCycle.Annual) text = 'annually';
  if (billingCycle === BillingCycle.Monthly) text = 'monthly';
  if (billingCycle === BillingCycle.ThreeMonths) text = 'every 3 months';

  return 'Billing ' + text;
};
