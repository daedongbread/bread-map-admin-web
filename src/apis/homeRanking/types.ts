/*
 * HomeRanking = 랭킹 관리
 * 1. 랭킹 조회 (GetHomeRankingPayload, SimpleBakeryInfoEntity, GetHomeRankingResponse)
 */

export type GetHomeRankingPayload = {
  startDate: string;
};

type SimpleBakeryInfoEntity = {
  rank: number;
  bakeryId: number;
  bakeryName: string;
  viewCount: number;
  flagCount: number;
  score: number;
  calculatedDate: string;
};

export type GetHomeRankingResponse = {
  startDate: string;
  endDate: string;
  dateList: string[];
  simpleBakeryInfoList: SimpleBakeryInfoEntity[];
};

export interface HomeRankingApiClient {
  getList: (params: GetHomeRankingPayload) => Promise<GetHomeRankingResponse>;
}
