import React, { createContext, useContext } from 'react';
import { Bakery } from '@/apis/bakery/bakery';

export const BakeryApiContext = createContext<{ bakery: Bakery | null }>({ bakery: null });

export const useBakeryApi = () => {
  return useContext(BakeryApiContext);
};
