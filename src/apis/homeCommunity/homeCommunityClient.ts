import { fetcher } from '@/apis/axios';
import {
  AddHomeCommunityEntity,
  GetHomeCommunitiesPayload,
  GetHomeCommunityResponse,
  HomeCommunityApiClient,
  HomeCommunityEntity,
} from '@/apis/homeCommunity/types';

export class HomeCommunityClient implements HomeCommunityApiClient {
  async getList(params: GetHomeCommunitiesPayload) {
    const resp = await fetcher.get<GetHomeCommunityResponse>(`/posts/${params.page}`);
    const { contents, totalElements, totalPages } = resp.data;
    return { contents, totalCount: totalElements, totalPages };
  }

  async get({ communityId }: { communityId: number }) {
    const resp = (await fetcher.get(`/posts/detail/${communityId}`)) as HomeCommunityEntity;
    return resp;
  }

  async create(payload: AddHomeCommunityEntity) {
    await fetcher.post('/posts', payload);
  }

  async update(payload: HomeCommunityEntity) {
    await fetcher.patch(`/posts/${payload.managerId}`, payload);
  }
}
