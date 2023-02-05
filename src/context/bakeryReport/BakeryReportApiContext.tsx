import React, { createContext, useContext } from 'react';
import { BakeryReport } from '@/apis';

export const BakeryReportApiContext = createContext<{ bakeryReport: BakeryReport | null }>({ bakeryReport: null });

export const useBakeryReportApi = () => {
  return useContext(BakeryReportApiContext);
};
