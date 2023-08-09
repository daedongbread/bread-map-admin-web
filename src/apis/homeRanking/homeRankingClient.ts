import { fetcher } from '@/apis/axios';
import { GetHomeRankingPayload, GetHomeRankingResponse, HomeRankingApiClient, UpdateRankingPayload } from '@/apis/homeRanking/types';

export class HomeRankingClient implements HomeRankingApiClient {
  async getList({ startDate }: GetHomeRankingPayload) {
    const resp = await fetcher.get<GetHomeRankingResponse>(`/rank/${startDate}`);
    return resp.data;
  }

  async update(payload: UpdateRankingPayload) {
    await fetcher.post('/rank', payload);
  }
}
