import React, { ReactNode } from 'react';
import { BakeryApiProvider } from '@/context/bakery';

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return <BakeryApiProvider>{children}</BakeryApiProvider>;
};
