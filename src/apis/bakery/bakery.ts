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

  async getImages({ bakeryId, imageType, page }: GetBakeryImagePayload) {
    const list = await this.client.getImageList({ bakeryId, imageType, page });
    return list;
  }

  async uploadImage({ payload }: UploadImagePayload) {
    await this.client.uploadImage({ payload });
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
    const list = await this.client.getBakeryInfoUpdateRequests({ bakeryId, page });
    return list;
  }

  async completeBakeryInfoUpdateRequest({ bakeryId, reportId }: CompleteBakeryInfoUpdateRequestPayload) {
    await this.client.completeBakeryInfoUpdateRequest({ bakeryId, reportId });
  }

  async deleteBakeryInfoUpdateRequest({ bakeryId, reportId }: DeleteBakeryInfoUpdateRequestPayload) {
    await this.client.deleteBakeryInfoUpdateRequest({ bakeryId, reportId });
  }
}
