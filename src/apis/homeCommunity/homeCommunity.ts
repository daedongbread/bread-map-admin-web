import { AddHomeCommunityEntity, GetHomeCommunitiesPayload, HomeCommunityApiClient, HomeCommunityEntity } from '@/apis/homeCommunity/types';

export class HomeCommunity {
  constructor(public client: HomeCommunityApiClient) {}

  async getList(params: GetHomeCommunitiesPayload) {
    return await this.client.getList(params);
  }

  async get({ communityId }: { communityId: number }): Promise<HomeCommunityEntity> {
    return await this.client.get({ communityId });
  }

  async create(payload: AddHomeCommunityEntity) {
    await this.client.create(payload);
  }

  async update(payload: HomeCommunityEntity) {
    await this.client.update(payload);
  }
}
