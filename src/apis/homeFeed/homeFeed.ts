import {
  BakeryApiClient,
  CompleteBakeryInfoUpdateRequestPayload,
  CreateUpdateBakeryPayload,
  DeleteBakeryImagePayload,
  DeleteBakeryInfoUpdateRequestPayload,
  DeleteBakeryMenuReportPayload,
  DeleteBakeryNewReviewPayload,
  GetBakeriesPayload,
  GetBakeryAddressPayload,
  GetBakeryImageMenuBarPayload,
  GetBakeryImagePayload,
  GetBakeryInfoUpdateRequestsPayload,
  GetBakeryMenuReportPayload,
  GetBakeryNewReviewsPayload,
  UpdateBakeryMenuReportImagesPayload,
  UpdateBakeryNewReviewExposeStatusPayload,
  UpdateBakeryNewReviewImagesPayload,
  UploadImagePayload,
} from '@/apis';

export class HomeFeed {
  constructor(public client: BakeryApiClient) {}

  async getAlarmCount() {
    return await this.client.getAlarmCount();
  }

  async getItem({ bakeryId }: { bakeryId: number }) {
    return await this.client.getItem({ bakeryId });
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    return await this.client.createItem({ payload });
  }

  async updateItem({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) {
    await this.client.updateItem({ bakeryId, payload });
  }

  async searchAddress({ address }: GetBakeryAddressPayload) {
    return await this.client.searchAddress({ address });
  }

  async getList({ page, name, filterBy }: GetBakeriesPayload) {
    return await this.client.getList({ page, name, filterBy });
  }

  async getBakeryReportNewStatus({ bakeryId }: { bakeryId: number }) {
    return await this.client.getBakeryReportNewStatus({ bakeryId });
  }

  async getImages({ bakeryId, imageType, page }: GetBakeryImagePayload) {
    return await this.client.getImageList({ bakeryId, imageType, page });
  }

  async uploadImage({ payload }: UploadImagePayload) {
    return await this.client.uploadImage({ payload });
  }

  async deleteImage({ bakeryId, imageType, imageId }: DeleteBakeryImagePayload) {
    await this.client.deleteImage({ bakeryId, imageType, imageId });
  }

  async getMenuReports({ bakeryId, page }: GetBakeryMenuReportPayload) {
    return await this.client.getBakeryMenuReportList({ bakeryId, page });
  }

  async updateMenuReportImages({ bakeryId, reportId, imageIdList }: UpdateBakeryMenuReportImagesPayload) {
    await this.client.updateBakeryMenuReportImages({ bakeryId, reportId, imageIdList });
  }

  async deleteMenuReport({ bakeryId, reportId }: DeleteBakeryMenuReportPayload) {
    await this.client.deleteBakeryMenuReport({ bakeryId, reportId });
  }

  async getBakeryInfoUpdateRequests({ bakeryId, page }: GetBakeryInfoUpdateRequestsPayload) {
    return await this.client.getBakeryInfoUpdateRequests({ bakeryId, page });
  }

  async completeBakeryInfoUpdateRequest({ bakeryId, reportId }: CompleteBakeryInfoUpdateRequestPayload) {
    await this.client.completeBakeryInfoUpdateRequest({ bakeryId, reportId });
  }

  async deleteBakeryInfoUpdateRequest({ bakeryId, reportId }: DeleteBakeryInfoUpdateRequestPayload) {
    await this.client.deleteBakeryInfoUpdateRequest({ bakeryId, reportId });
  }

  async getBakeryNewReviewList({ bakeryId, page }: GetBakeryNewReviewsPayload) {
    return await this.client.getBakeryNewReviewList({ bakeryId, page });
  }
  async updateBakeryNewReviewExposeStatus({ bakeryId, reviewId }: UpdateBakeryNewReviewExposeStatusPayload) {
    await this.client.updateBakeryNewReviewExposeStatus({ bakeryId, reviewId });
  }
  async deleteBakeryNewReview({ bakeryId, reviewId }: DeleteBakeryNewReviewPayload) {
    await this.client.deleteBakeryNewReview({ bakeryId, reviewId });
  }
  async updateBakeryNewReviewImages({ bakeryId, reviewId, imageIdList }: UpdateBakeryNewReviewImagesPayload) {
    await this.client.updateBakeryNewReviewImages({ bakeryId, reviewId, imageIdList });
  }

  async getBakeryImageMenuBar({ bakeryId }: GetBakeryImageMenuBarPayload) {
    return await this.client.getBakeryImageMenuBar({ bakeryId });
  }
}
