export * from './types';
import { BakeryReportStatus } from '@/constants';
import { fetcher } from '../axios';
import { BakeryReportsItemEntity } from './types';

type GetBakeryReportsResponse = {
  contents: BakeryReportsItemEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetBakeryReportsPayload = {
  page: number;
};

export type GetBakeryReportPayload = {
  reportId: number;
};

export type UpdateReportStatusPayload = GetBakeryReportPayload & { status: BakeryReportStatus };

const getBakeryReports = async ({ page }: GetBakeryReportsPayload) => {
  const resp = await fetcher.get<GetBakeryReportsResponse>('/bakery/report', { params: { page } });
  return { bakeryReports: resp.data.contents, totalCount: resp.data.totalElements };
};

const getBakeryReport = async ({ reportId }: GetBakeryReportPayload) => {
  const resp = await fetcher.get<BakeryReportsItemEntity>(`/bakery/report/${reportId}`);
  return resp.data;
};

const updateBakeryReportStatus = async ({ reportId, status }: UpdateReportStatusPayload) => {
  await fetcher.patch(`/bakery/report/${reportId}`, { status });
};

export { getBakeryReports, getBakeryReport, updateBakeryReportStatus };
