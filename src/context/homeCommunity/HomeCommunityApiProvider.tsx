import React, { ReactNode } from 'react';
import { HomeCommunity, HomeCommunityClient } from '@/apis/homeCommunity';
import { HomeCommunityApiContext } from '@/context/homeCommunity/HomeCommunityApiContext';

const client = new HomeCommunityClient();
const homeCommunity = new HomeCommunity(client);

export const HomeCommunityApiProvider = ({ children }: { children: ReactNode }) => {
  return <HomeCommunityApiContext.Provider value={{ homeCommunity }}>{children}</HomeCommunityApiContext.Provider>;
};
