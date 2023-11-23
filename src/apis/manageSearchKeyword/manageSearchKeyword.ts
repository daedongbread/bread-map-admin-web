import { ManageSearchKeywordApiClient, SearchKeywordCountPayload, UpdateSearchKeywordRankPayload } from '@/apis/manageSearchKeyword/types';

export class ManageSearchKeyword {
  constructor(public client: ManageSearchKeywordApiClient) {}

  async getRanks() {
    return await this.client.getRanks();
  }

  async getCounts(params: SearchKeywordCountPayload) {
    return await this.client.getCounts(params);
  }

  async updateRanks(params: UpdateSearchKeywordRankPayload) {
    await this.client.updateRanks(params);
  }
}
