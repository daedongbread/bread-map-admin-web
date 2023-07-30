import React, { ReactNode } from 'react';
import { HomeFeed, HomeFeedClient } from '@/apis/homeFeed';
import { HomeFeedApiContext } from '@/context/homeFeed/HomeFeedApiContext';

const client = new HomeFeedClient();
const homeFeed = new HomeFeed(client);

export const HomeFeedApiProvider = ({ children }: { children: ReactNode }) => {
  return <HomeFeedApiContext.Provider value={{ homeFeed }}>{children}</HomeFeedApiContext.Provider>;
};
