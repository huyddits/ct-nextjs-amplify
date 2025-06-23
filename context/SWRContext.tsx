'use client';

import React, { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{ dedupingInterval: 4000, shouldRetryOnError: false, revalidateOnFocus: false }}
    >
      {children}
    </SWRConfig>
  );
};
