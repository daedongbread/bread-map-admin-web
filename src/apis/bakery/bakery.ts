import { fetcher } from '@/apis/axios';
import {
  BakeryApiClient,
  CompleteBakeryInfoUpdateRequestPayload,
  CreateUpdateBakeryPayload,
  DeleteBakeryInfoUpdateRequestPayload,
  DeleteBakeryMenuReportPayload,
  GetBakeriesPayload,
  GetBakeryImagePayload,
  GetBakeryInfoUpdateRequestsPayload,
  GetBakeryMenuReportPayload,
  UpdateBakeryMenuReportImagesPayload,
  UploadImagePayload,
} from './types';

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

  async getImages({ bakeryId, imageType, page }: GetBakeryImagePayload) {
    const list = await this.client.getImageList({ bakeryId, imageType, page });
    return list;
  }

  async uploadImage({ payload }: UploadImagePayload) {
    await uploadImage({ payload });
  }

  async getMenuReports({ bakeryId, page }: GetBakeryMenuReportPayload) {
    const list = await this.client.getBakeryMenuReportList({ bakeryId, page });
    return list;
  }

  async updateMenuReportImages({ bakeryId, reportId, imageIdList }: UpdateBakeryMenuReportImagesPayload) {
    await this.client.updateBakeryMenuReportImages({ bakeryId, reportId, imageIdList });
  }

  async deleteMenuReport({ bakeryId, reportId }: DeleteBakeryMenuReportPayload) {
    await this.client.deleteBakeryMenuReport({ bakeryId, reportId });
  }

  async getBakeryInfoUpdateRequests({ bakeryId, page }: GetBakeryInfoUpdateRequestsPayload) {
    await this.client.getBakeryInfoUpdateRequests({ bakeryId, page });
  }

  async completeBakeryInfoUpdateRequest({ bakeryId, reportId }: CompleteBakeryInfoUpdateRequestPayload) {
    await this.client.completeBakeryInfoUpdateRequest({ bakeryId, reportId });
  }

  async deleteBakeryInfoUpdateRequest({ bakeryId, reportId }: DeleteBakeryInfoUpdateRequestPayload) {
    await this.client.deleteBakeryInfoUpdateRequest({ bakeryId, reportId });
  }
}

// TODO: mutation error로 인해 임시로 설정
const create = async ({ payload }: CreateUpdateBakeryPayload) => {
  await fetcher.post('bakeries', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const update = async ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => {
  await fetcher.post(`bakeries/${bakeryId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const uploadImage = async ({ payload }: UploadImagePayload) => {
  await fetcher.post('images', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
