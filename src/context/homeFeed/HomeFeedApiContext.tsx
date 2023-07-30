import React, { createContext, useContext } from 'react';
import { HomeFeed } from '@/apis';

export const HomeFeedApiContext = createContext<{ homeFeed: HomeFeed | null }>({ homeFeed: null });

export const useHomeFeedApi = () => {
  return useContext(HomeFeedApiContext);
};
