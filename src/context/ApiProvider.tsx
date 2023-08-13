import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';
import { BakeryReportApiProvider } from '@/context/bakeryReport';
import { HomeCarouselApiProvider } from '@/context/homeCarousel/HomeCarouselApiProvider';
import { HomeCommunityApiProvider } from '@/context/homeCommunity';
import { HomeFeedApiProvider } from '@/context/homeFeed';
import { HomeRankingApiProvider } from '@/context/homeRanking';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>
        <HomeFeedApiProvider>
          <HomeCommunityApiProvider>
            <HomeCarouselApiProvider>
              <HomeRankingApiProvider>{children}</HomeRankingApiProvider>
            </HomeCarouselApiProvider>
          </HomeCommunityApiProvider>
        </HomeFeedApiProvider>
      </BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};
