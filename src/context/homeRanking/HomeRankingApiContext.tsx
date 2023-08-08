import React, { createContext, useContext } from 'react';
import { HomeRanking } from '@/apis/homeRanking';

export const HomeRankingApiContext = createContext<{ ranking: HomeRanking | null }>({ ranking: null });

export const useHomeRankingApi = () => {
  return useContext(HomeRankingApiContext);
};
