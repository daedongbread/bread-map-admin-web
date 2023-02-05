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

export type GetBakeryReportsResponse = {
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

export interface BakeryReportApiClient {
  getItem: ({ reportId }: { reportId: number }) => Promise<BakeryReportsItemEntity>;
  updateItemStatus: ({ reportId, status }: UpdateReportStatusPayload) => void;
  getList: ({ page }: GetBakeryReportsPayload) => Promise<{ bakeryReports: BakeryReportsItemEntity[]; totalCount: number; totalPages: number }>;
}
