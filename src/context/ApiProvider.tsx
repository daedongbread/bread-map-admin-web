import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';
import { BakeryReportApiProvider } from '@/context/bakeryReport';
import { HomeFeedApiProvider } from '@/context/homeFeed';
import { HomeRankingApiProvider } from '@/context/homeRanking';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>
        <HomeFeedApiProvider>
          <HomeRankingApiProvider>{children}</HomeRankingApiProvider>
        </HomeFeedApiProvider>
      </BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};
