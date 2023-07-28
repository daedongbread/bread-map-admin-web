import { BakeryReportStatus } from '@/constants';

type CurationCommonEntity = {
  subTitle: string;
  introduction: string;
  conclusion: string;
  categoryId: number;
  thumbnailUrl: string;
  activated: 'POSTING' | 'SCHEDULED' | 'DELETED';
  feedType: 'CURATION';
  activeTime: string;
};

type CurationBakeryEntity = {
  bakeryId: number;
  productId: number;
  reason: string;
};

export type CurationFeedEntity = {
  common: CurationCommonEntity;
  curation: CurationBakeryEntity;
  landing: null;
};

export interface CurationFeedApiClient {
  getItem: ({ reportId }: { reportId: number }) => Promise<BakeryReportsItemEntity>;
  updateItemStatus: ({ reportId, status }: UpdateReportStatusPayload) => void;
  getList: ({ page }: GetBakeryReportsPayload) => Promise<{ bakeryReports: BakeryReportsItemEntity[]; totalCount: number; totalPages: number }>;
}

// ------ TODO: 삭제

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
