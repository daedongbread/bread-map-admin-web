import { HomeCarouselApiClient, UpdateHomeCarouselPayload } from '@/apis/homeCarousel/types';

export class HomeCarousel {
  constructor(public client: HomeCarouselApiClient) {}

  async getList() {
    return await this.client.getList();
  }

  async update(payload: UpdateHomeCarouselPayload) {
    await this.client.update(payload);
  }
}
