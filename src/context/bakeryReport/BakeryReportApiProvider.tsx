import React, { ReactNode } from 'react';
import { BakeryReport, BakeryReportClient } from '@/apis';
import { BakeryReportApiContext } from '@/context/bakeryReport/BakeryReportApiContext';

const client = new BakeryReportClient();
const bakeryReport = new BakeryReport(client);

export const BakeryReportApiProvider = ({ children }: { children: ReactNode }) => {
  return <BakeryReportApiContext.Provider value={{ bakeryReport }}>{children}</BakeryReportApiContext.Provider>;
};
