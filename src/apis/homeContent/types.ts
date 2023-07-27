import { BakeryReportStatus } from '@/constants';

// TODO: API 응답 타입 정의
export type BakeryReportsItemEntity = BakeryReportDetailEntity & {
  reportId: number;
  createdAt: string;
};

export type BakeryReportDetailEntity = {
  userId: number;
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
