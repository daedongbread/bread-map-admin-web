import { BaseResponse } from '@/apis/types';

/*
 * HomeFeed = 콘텐츠 관리 (메뉴명) / CurationFeed = 큐레이션 콘텐츠 관리 (초기에 Landing 타입이 있었음)
 * 1. 콘텐츠 조회 (GetHomeFeedsPayload, CurationFeedsItemEntity, GetHomeFeedsResponse)
 * 2. 콘텐츠 상세 조회 (CurationFeedDetailEntity)
 * 3. 콘텐츠 생성 (CreateUpdateCurationFeedPayload, CreateCurationFeedResponse)
 * 4. 콘텐츠 수정 (CreateUpdateCurationFeedPayload)
 */

export type GetHomeFeedsPayload = {
  activeAt: string | null;
  createBy: string | null;
  activated: 'POSTING' | 'INACTIVATED' | null;
  categoryName: string | null;
  page: number;
  size: number;
};

export type GetHomeFeedsResponse = BaseResponse & {
  data: CurationFeedsItemEntity[];
};

type CurationCommonEntity = {
  feedId?: number; // 상세 조회시 존재
  subTitle: string;
  introduction: string;
  conclusion: string;
  categoryId: number;
  thumbnailUrl: string;
  activated: 'POSTING' | 'INACTIVATED';
  feedType: 'CURATION';
  activeTime: string;
};

type CurationBakeryEntity = {
  bakeryId: number;
  productId: number;
  reason: string;
};

export type CurationFeedDetailEntity = {
  common: CurationCommonEntity;
  curation: CurationBakeryEntity;
  landing: null; // 초기 landing 타입이 있었을때 만들어짐
};

type CurationFeedsItemEntity = {
  feedId: number;
  feedTitle: string;
  authorName: string;
  activeTime: string;
  isActive: string;
};

export type CreateUpdateCurationFeedPayload = {
  payload: CurationFeedDetailEntity;
};

export interface HomeFeedApiClient {
  getItem: ({ feedId }: { feedId: number }) => Promise<CurationFeedDetailEntity>;
  createItem: ({ payload }: CreateUpdateCurationFeedPayload) => Promise<any>; // TODO: 응답 타입 정의
  updateItem: ({ payload }: CreateUpdateCurationFeedPayload) => void;
  getList: (params: GetHomeFeedsPayload) => Promise<{ feeds: CurationFeedsItemEntity[]; totalCount: number; totalPages: number }>;
}
