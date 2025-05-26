'use client';

import React, { createContext, useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';

const StripeContext = createContext<boolean>(false);

export const useStripeContext = () => useContext(StripeContext);

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeContext.Provider value={true}>{children}</StripeContext.Provider>
    </Elements>
  );
};
