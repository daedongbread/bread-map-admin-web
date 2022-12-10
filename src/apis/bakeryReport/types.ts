import { BakeryReportStatus } from '@/constants';

export type BakeryReportsItemEntity = BakeryReportDetailEntity & {
  reportId: number;
  createdAt: string;
};

export type BakeryReportDetailEntity = {
  nickName: string;
  bakeryName: string;
  location: string;
  content: string;
  status: BakeryReportStatus;
};
