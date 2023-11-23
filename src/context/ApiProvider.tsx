import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';
import { BakeryReportApiProvider } from '@/context/bakeryReport';
import { HomeCarouselApiProvider } from '@/context/homeCarousel/HomeCarouselApiProvider';
import { HomeCommunityApiProvider } from '@/context/homeCommunity';
import { HomeFeedApiProvider } from '@/context/homeFeed';
import { HomeRankingApiProvider } from '@/context/homeRanking';
import { ManageSearchKeywordApiProvider } from '@/context/manageSearchKeyword';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>
        <HomeFeedApiProvider>
          <HomeCommunityApiProvider>
            <HomeCarouselApiProvider>
              <HomeRankingApiProvider>
                <ManageSearchKeywordApiProvider>{children}</ManageSearchKeywordApiProvider>
              </HomeRankingApiProvider>
            </HomeCarouselApiProvider>
          </HomeCommunityApiProvider>
        </HomeFeedApiProvider>
      </BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};
