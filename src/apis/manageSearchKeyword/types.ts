export type SearchKeywordRankEntity = {
  keyword: string;
  rank: number;
};

export type SearchKeywordCountPayload = {
  sortType: 'ONE_WEEK' | 'ONE_MONTH' | 'THREE_MONTH';
};

export type SearchKeywordCountResponse = {
  id: number;
  keyword: string;
  oneWeekCount: number;
  oneMonthCount: number;
  threeMonthCount: number;
};

export type UpdateSearchKeywordRankPayload = {
  HotKeywordList: SearchKeywordRankEntity[];
};

export interface ManageSearchKeywordApiClient {
  getRanks: () => Promise<SearchKeywordRankEntity[]>;
  getCounts: (payload: SearchKeywordCountPayload) => Promise<SearchKeywordCountResponse[]>;
  updateRanks: (payload: UpdateSearchKeywordRankPayload) => Promise<void>;
}
