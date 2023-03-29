import { BakeryApiClient, BakeryDetailEntity, CreateUpdateBakeryPayload, GetBakeriesPayload, GetBakeriesResponse } from '@/apis';
import { fetcher } from '@/apis/axios';

export class BakeryClient implements BakeryApiClient {
  async getItem({ bakeryId }: { bakeryId: number }) {
    const resp = await fetcher.get<BakeryDetailEntity>(`bakeries/${bakeryId}`);
    return resp.data;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    await fetcher.post('bakeries', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async updateItem({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) {
    await fetcher.post(`bakeries/${bakeryId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getList({ page }: Omit<GetBakeriesPayload, 'name'>) {
    const resp = await fetcher.get<GetBakeriesResponse>(`/bakeries`, { params: { page } });
    return { bakeries: resp.data.contents, totalCount: resp.data.totalElements, totalPages: resp.data.totalPages };
  }

  async searchList({ name, page }: GetBakeriesPayload) {
    const resp = await fetcher.get<GetBakeriesResponse>('/bakeries/search', { params: { name, page } });
    return { bakeries: resp.data.contents, totalCount: resp.data.totalElements, totalPages: resp.data.totalPages };
  }
}
