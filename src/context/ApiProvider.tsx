import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';
import { BakeryReportApiProvider } from '@/context/bakeryReport';
import { HomeCommunityApiProvider } from '@/context/homeCommunity';
import { HomeFeedApiProvider } from '@/context/homeFeed';
import { HomeRankingApiProvider } from '@/context/homeRanking';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>
        <HomeFeedApiProvider>
          <HomeCommunityApiProvider>
            <HomeRankingApiProvider>{children}</HomeRankingApiProvider>
            </HomeCommunityApiProvider>
        </HomeFeedApiProvider>
      </BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};
