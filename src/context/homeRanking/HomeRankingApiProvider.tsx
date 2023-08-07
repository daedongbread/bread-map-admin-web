import React, { ReactNode } from 'react';
import { HomeFeed, HomeFeedClient } from '@/apis/homeFeed';
import { HomeRanking, HomeRankingClient } from '@/apis/homeRanking';
import { HomeFeedApiContext } from '@/context/homeFeed/HomeFeedApiContext';
import { HomeRankingApiContext } from '@/context/homeRanking/HomeRankingApiContext';

const client = new HomeRankingClient();
const ranking = new HomeRanking(client);

export const HomeRankingApiProvider = ({ children }: { children: ReactNode }) => {
  return <HomeRankingApiContext.Provider value={{ ranking }}>{children}</HomeRankingApiContext.Provider>;
};
