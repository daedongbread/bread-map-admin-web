import { CreateBakeryResponse } from '@/apis';
import { fetcher } from '@/apis/axios';
import { CreateUpdateCurationFeedPayload, CurationFeedDetailEntity, GetHomeFeedsPayload, GetHomeFeedsResponse, HomeFeedApiClient } from '@/apis/homeFeed/types';

export class HomeFeedClient implements HomeFeedApiClient {
  async getItem({ feedId }: { feedId: number }) {
    const resp = await fetcher.get<CurationFeedDetailEntity>(`feed/${feedId}`, { params: { feedType: 'CURATION' } });
    return resp.data;
  }

  async createItem({ payload }: CreateUpdateCurationFeedPayload) {
    const resp = await fetcher.post<CreateBakeryResponse>('feed', payload);
    return resp.data;
  }

  async updateItem({ payload }: CreateUpdateCurationFeedPayload) {
    // TODO: feedId를 인자로 받을지 고민
    await fetcher.patch(`bakeries/${payload.common.feedId}`, payload);
  }

  async getList(params: GetHomeFeedsPayload) {
    const resp = await fetcher.get<GetHomeFeedsResponse>(`/feed/all`, { params });
    const { data, totalElements, totalPages } = resp.data;
    return { feeds: data, totalCount: totalElements, totalPages };
  }
}
