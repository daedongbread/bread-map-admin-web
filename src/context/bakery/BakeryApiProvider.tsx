import React, { ReactNode } from 'react';
import { Bakery } from '@/apis/bakery/bakery';
import { BakeryClient } from '@/apis/bakery/bakeryClient';
import { BakeryApiContext } from '@/context/bakery/BakeryApiContext';

const client = new BakeryClient();
const bakery = new Bakery(client);

export const BakeryApiProvider = ({ children }: { children: ReactNode }) => {
  return <BakeryApiContext.Provider value={{ bakery }}>{children}</BakeryApiContext.Provider>;
};
