import { GetHomeRankingPayload, HomeRankingApiClient, UpdateRankingPayload } from '@/apis/homeRanking/types';

export class HomeRanking {
  constructor(public client: HomeRankingApiClient) {}

  async getList(params: GetHomeRankingPayload) {
    return await this.client.getList(params);
  }

  async update(params: UpdateRankingPayload) {
    return await this.client.update(params);
  }
}
