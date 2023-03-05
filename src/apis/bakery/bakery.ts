import { fetcher } from '@/apis/axios';
import { BakeryApiClient, CreateUpdateBakeryPayload, GetBakeriesPayload } from './types';

export class Bakery {
  constructor(public client: BakeryApiClient) {}

  async getItem({ bakeryId }: { bakeryId: number }) {
    const item = await this.client.getItem({ bakeryId });
    return item;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    await create({ payload });
    // await this.client.createItem({ payload });
  }

  async updateItem({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) {
    await update({ bakeryId, payload });
    // await this.client.updateItem({ bakeryId, payload });
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

// TODO: mutation error로 인해 임시로 설정
const create = async ({ payload }: CreateUpdateBakeryPayload) => {
  await fetcher.post('bakery', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const update = async ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => {
  await fetcher.post(`bakery/${bakeryId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
