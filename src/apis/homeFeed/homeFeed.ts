import { CreateUpdateCurationFeedPayload, GetHomeFeedsPayload, HomeFeedApiClient } from '@/apis/homeFeed/types';

export class HomeFeed {
  constructor(public client: HomeFeedApiClient) {}

  async getItem({ feedId }: { feedId: number }) {
    return await this.client.getItem({ feedId });
  }

  async createItem({ payload }: CreateUpdateCurationFeedPayload) {
    return await this.client.createItem({ payload });
  }

  async updateItem(payload: { feedId: number } & CreateUpdateCurationFeedPayload) {
    await this.client.updateItem(payload);
  }

  async getList(params: GetHomeFeedsPayload) {
    return await this.client.getList(params);
  }
}
