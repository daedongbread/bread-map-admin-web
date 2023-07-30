import { createContext, useContext } from 'react';
import { HomeCommunity } from '@/apis/homeCommunity';

export const HomeCommunityApiContext = createContext<{ homeCommunity: HomeCommunity | null }>({ homeCommunity: null });

export const useHomeCommunityApi = () => {
  return useContext(HomeCommunityApiContext);
};
