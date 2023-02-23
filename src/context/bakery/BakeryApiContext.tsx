import React, { createContext, useContext } from 'react';
import { Bakery } from '@/apis/bakery/bakery';

export const BakeryApiContext = createContext<{ bakery: Bakery | null }>({ bakery: null });

export const useBakeryApi = () => {
  const context = useContext(BakeryApiContext);
  if (!context) throw new Error('bakery context가 없습니다.');

  return context;
};
