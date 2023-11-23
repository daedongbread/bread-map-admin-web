import { fetcher } from '@/apis/axios';
import {
  ManageSearchKeywordApiClient,
  SearchKeywordCountPayload,
  SearchKeywordCountResponse,
  SearchKeywordRankEntity,
  UpdateSearchKeywordRankPayload,
} from '@/apis/manageSearchKeyword/types';

export class ManageSearchKeywordClient implements ManageSearchKeywordApiClient {
  async getRanks(): Promise<SearchKeywordRankEntity[]> {
    const resp = await fetcher.get<SearchKeywordRankEntity[]>(`/search/hot-keywords/rank`);
    return resp.data;
  }

  async getCounts({ sortType }: SearchKeywordCountPayload): Promise<SearchKeywordCountResponse[]> {
    const resp = await fetcher.get<SearchKeywordCountResponse[]>(`/search/hot-keywords?sortType=${sortType}`);
    return resp.data;
  }

  async updateRanks(payload: UpdateSearchKeywordRankPayload): Promise<void> {
    await fetcher.put('/search/hot-keywords/rank', payload);
  }
}
