import React, { ReactNode } from 'react';
import { HomeRanking, HomeRankingClient } from '@/apis/homeRanking';
import { HomeRankingApiContext } from '@/context/homeRanking/HomeRankingApiContext';

const client = new HomeRankingClient();
const ranking = new HomeRanking(client);

export const HomeRankingApiProvider = ({ children }: { children: ReactNode }) => {
  return <HomeRankingApiContext.Provider value={{ ranking }}>{children}</HomeRankingApiContext.Provider>;
};
