import { fetcher } from '@/apis/axios';
import { CreateUpdateCurationFeedPayload, CurationFeedDetailEntity, GetHomeFeedsPayload, GetHomeFeedsResponse, HomeFeedApiClient } from '@/apis/homeFeed/types';

export class HomeFeedClient implements HomeFeedApiClient {
  async getItem({ feedId }: { feedId: number }) {
    const resp = await fetcher.get<CurationFeedDetailEntity>(`feed/${feedId}`, { params: { feedType: 'CURATION' } });
    return resp.data;
  }

  async createItem({ payload }: CreateUpdateCurationFeedPayload) {
    const resp = await fetcher.post('feed', payload);
    return resp.data;
  }

  async updateItem({ feedId, payload }: { feedId: number } & CreateUpdateCurationFeedPayload) {
    // TODO: feedId를 인자로 받을지 고민
    await fetcher.patch(`feed/${feedId}`, payload);
  }

  async getList(params: GetHomeFeedsPayload) {
    const resp = await fetcher.get<GetHomeFeedsResponse>(`/feed/all`, { params });
    const { contents, totalElements, totalPages } = resp.data;
    return { feeds: contents, totalCount: totalElements, totalPages };
  }
}
