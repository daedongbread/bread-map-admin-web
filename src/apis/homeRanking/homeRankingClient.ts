import { fetcher } from '@/apis/axios';
import { CreateUpdateCurationFeedPayload, CurationFeedDetailEntity, GetHomeFeedsPayload, GetHomeFeedsResponse, HomeFeedApiClient } from '@/apis/homeFeed/types';
import { GetHomeRankingPayload, GetHomeRankingResponse, HomeRankingApiClient } from '@/apis/homeRanking/types';

export class HomeRankingClient implements HomeRankingApiClient {
  // async getItem({ feedId }: { feedId: number }) {
  //   const resp = await fetcher.get<CurationFeedDetailEntity>(`feed/${feedId}`, { params: { feedType: 'CURATION' } });
  //   return resp.data;
  // }
  //
  // async createItem({ payload }: CreateUpdateCurationFeedPayload) {
  //   const resp = await fetcher.post('feed', payload);
  //   return resp.data;
  // }
  //
  // async updateItem({ feedId, payload }: { feedId: number } & CreateUpdateCurationFeedPayload) {
  //   // TODO: feedId를 인자로 받을지 고민
  //   await fetcher.patch(`feed/${feedId}`, payload);
  // }

  async getList({ startDate }: GetHomeRankingPayload) {
    const resp = await fetcher.get<GetHomeRankingResponse>(`/rank/${startDate}`);
    return resp.data;
  }
}
