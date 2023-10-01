import { fetcher } from '@/apis/axios';
import { GetHomeCarouselResponse, HomeCarouselApiClient, UpdateHomeCarouselPayload } from '@/apis/homeCarousel/types';

export class HomeCarouselClient implements HomeCarouselApiClient {
  async getList(): Promise<GetHomeCarouselResponse> {
    const resp = await fetcher.get<GetHomeCarouselResponse>(`/carousels`);
    return resp.data;
  }

  async update(payload: UpdateHomeCarouselPayload) {
    await fetcher.patch('/posts/order', payload);
  }
}
