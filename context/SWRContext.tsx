'use client';

import React, { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig value={{ dedupingInterval: 3000, shouldRetryOnError: false }}>{children}</SWRConfig>
  );
};
