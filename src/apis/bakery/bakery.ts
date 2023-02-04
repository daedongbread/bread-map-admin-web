import { BakeryApiClient, CreateUpdateBakeryPayload, GetBakeriesPayload } from './types';

export class Bakery {
  constructor(public client: BakeryApiClient) {}

  async getItem({ bakeryId }: { bakeryId: number }) {
    const item = await this.client.getItem({ bakeryId });
    return item;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    await this.client.createItem({ payload });
  }

  async updateItem({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) {
    await this.client.updateItem({ bakeryId, payload });
  }

  async getList({ page }: Omit<GetBakeriesPayload, 'name'>) {
    const list = await this.client.getList({ page });
    return list;
  }

  async searchList({ name, page }: GetBakeriesPayload) {
    const list = await this.client.searchList({ name, page });
    return list;
  }
}
