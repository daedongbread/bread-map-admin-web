import { CreateUpdateCurationFeedPayload, GetHomeFeedsPayload, HomeFeedApiClient } from '@/apis/homeFeed/types';
import { GetHomeRankingPayload, HomeRankingApiClient } from '@/apis/homeRanking/types';

export class HomeRanking {
  constructor(public client: HomeRankingApiClient) {}

  // async getItem({ feedId }: { feedId: number }) {
  //   return await this.client.getItem({ feedId });
  // }
  //
  // async createItem({ payload }: CreateUpdateCurationFeedPayload) {
  //   return await this.client.createItem({ payload });
  // }
  //
  // async updateItem(payload: { feedId: number } & CreateUpdateCurationFeedPayload) {
  //   await this.client.updateItem(payload);
  // }

  async getList(params: GetHomeRankingPayload) {
    return await this.client.getList(params);
  }
}
