import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';
import { BakeryReportApiProvider } from '@/context/bakeryReport';
import { HomeFeedApiProvider } from '@/context/homeFeed';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>
        <HomeFeedApiProvider>{children}</HomeFeedApiProvider>
      </BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};
