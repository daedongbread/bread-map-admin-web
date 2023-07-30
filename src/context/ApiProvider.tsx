import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';
import { BakeryReportApiProvider } from '@/context/bakeryReport';
import { HomeCommunityApiProvider } from '@/context/homeCommunity';
import { HomeFeedApiProvider } from '@/context/homeFeed';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>
        <HomeFeedApiProvider>
          <HomeCommunityApiProvider>{children}</HomeCommunityApiProvider>
        </HomeFeedApiProvider>
      </BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};
