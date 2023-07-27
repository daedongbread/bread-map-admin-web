import {
  BakeryAlarmCountEntity,
  BakeryApiClient,
  BakeryDetailEntity,
  CompleteBakeryInfoUpdateRequestPayload,
  CreateBakeryResponse,
  CreateUpdateBakeryPayload,
  DeleteBakeryImagePayload,
  DeleteBakeryInfoUpdateRequestPayload,
  DeleteBakeryMenuReportPayload,
  DeleteBakeryNewReviewPayload,
  GetBakeriesPayload,
  GetBakeriesResponse,
  GetBakeryAddressPayload,
  GetBakeryAddressResponse,
  GetBakeryImageMenuBarPayload,
  GetBakeryImageMenuBarResponse,
  GetBakeryImagePayload,
  GetBakeryImageResponse,
  GetBakeryInfoUpdateRequestsPayload,
  GetBakeryInfoUpdateRequestsResponse,
  GetBakeryMenuReportPayload,
  GetBakeryMenuReportsResponse,
  GetBakeryNewReviewsPayload,
  GetBakeryNewReviewsResponse,
  GetBakeryReportNewStatusEntity,
  UpdateBakeryMenuReportImagesPayload,
  UpdateBakeryNewReviewExposeStatusPayload,
  UpdateBakeryNewReviewImagesPayload,
  UploadImagePayload,
  UploadImageResponse,
} from '@/apis';
import { fetcher } from '@/apis/axios';

export class HomeContentClient implements BakeryApiClient {
  async getAlarmCount() {
    const resp = await fetcher.get<BakeryAlarmCountEntity>(`bakeries/alarm-bar`);
    return resp.data;
  }

  async getItem({ bakeryId }: { bakeryId: number }) {
    const resp = await fetcher.get<BakeryDetailEntity>(`bakeries/${bakeryId}`);
    return resp.data;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    const resp = await fetcher.post<CreateBakeryResponse>('bakeries', payload);
    return resp.data;
  }

  async updateItem({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) {
    await fetcher.patch(`bakeries/${bakeryId}`, payload);
  }

  async searchAddress({ address }: GetBakeryAddressPayload) {
    const resp = await fetcher.get<GetBakeryAddressResponse>('/bakeries/location', { params: { address } });
    return resp.data;
  }

  async getList({ page, name, filterBy }: GetBakeriesPayload) {
    const resp = await fetcher.get<GetBakeriesResponse>(`/bakeries`, { params: { page, name, filterBy } });
    const { contents, totalElements, totalPages } = resp.data;
    return { bakeries: contents, totalCount: totalElements, totalPages };
  }

  async getBakeryReportNewStatus({ bakeryId }: { bakeryId: number }) {
    const resp = await fetcher.get<GetBakeryReportNewStatusEntity>(`/bakeries/${bakeryId}/is-new-bar`);
    return resp.data;
  }

  async getImageList({ bakeryId, imageType, page }: GetBakeryImagePayload) {
    const resp = await fetcher.get<GetBakeryImageResponse>(`/bakeries/${bakeryId}/images/${imageType}`, { params: { page } });
    const { contents, totalElements, totalPages } = resp.data;
    return {
      images: contents,
      totalCount: totalElements,
      totalPages,
    };
  }

  async uploadImage({ payload }: UploadImagePayload) {
    const resp = await fetcher.post<UploadImageResponse>('images', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      imagePath: resp.data.imagePath,
    };
  }

  async deleteImage({ bakeryId, imageType, imageId }: DeleteBakeryImagePayload) {
    await fetcher.delete(`/bakeries/${bakeryId}/images/${imageType}/${imageId}`);
  }

  async getBakeryMenuReportList({ bakeryId, page }: GetBakeryMenuReportPayload) {
    const resp = await fetcher.get<GetBakeryMenuReportsResponse>(`/bakeries/${bakeryId}/product-add-reports`, { params: { page } });
    const { contents, totalElements, totalPages } = resp.data;
    return {
      menuReports: contents,
      totalCount: totalElements,
      totalPages,
    };
  }

  async updateBakeryMenuReportImages({ bakeryId, reportId, imageIdList }: UpdateBakeryMenuReportImagesPayload) {
    await fetcher.patch(`/bakeries/${bakeryId}/product-add-reports/${reportId}/images`, { imageIdList });
  }

  async deleteBakeryMenuReport({ bakeryId, reportId }: DeleteBakeryMenuReportPayload) {
    await fetcher.delete(`/bakeries/${bakeryId}/product-add-reports/${reportId}`);
  }

  async getBakeryInfoUpdateRequests({ bakeryId, page }: GetBakeryInfoUpdateRequestsPayload) {
    const resp = await fetcher.get<GetBakeryInfoUpdateRequestsResponse>(`/bakeries/${bakeryId}/update-reports`, { params: { page } });
    const { contents, totalElements, totalPages } = resp.data;
    return {
      bakeryInfoUpdateRequests: contents,
      totalCount: totalElements,
      totalPages,
    };
  }

  async completeBakeryInfoUpdateRequest({ bakeryId, reportId }: CompleteBakeryInfoUpdateRequestPayload) {
    await fetcher.patch(`/bakeries/${bakeryId}/update-reports/${reportId}`);
  }

  async deleteBakeryInfoUpdateRequest({ bakeryId, reportId }: DeleteBakeryInfoUpdateRequestPayload) {
    await fetcher.delete(`/bakeries/${bakeryId}/update-reports/${reportId}`);
  }

  async getBakeryNewReviewList({ bakeryId, page }: GetBakeryNewReviewsPayload) {
    const resp = await fetcher.get<GetBakeryNewReviewsResponse>(`/bakeries/${bakeryId}/new-reviews`, { params: { page } });
    const { contents, totalElements, totalPages } = resp.data;
    return {
      bakeryNewReviews: contents,
      totalCount: totalElements,
      totalPages,
    };
  }
  async updateBakeryNewReviewExposeStatus({ bakeryId, reviewId }: UpdateBakeryNewReviewExposeStatusPayload) {
    await fetcher.patch(`/bakeries/${bakeryId}/new-reviews/${reviewId}`);
  }
  async deleteBakeryNewReview({ bakeryId, reviewId }: DeleteBakeryNewReviewPayload) {
    await fetcher.delete(`/bakeries/${bakeryId}/new-reviews/${reviewId}`);
  }
  async updateBakeryNewReviewImages({ bakeryId, reviewId, imageIdList }: UpdateBakeryNewReviewImagesPayload) {
    await fetcher.patch(`/bakeries/${bakeryId}/new-reviews/${reviewId}/images`, { imageIdList });
  }

  async getBakeryImageMenuBar({ bakeryId }: GetBakeryImageMenuBarPayload) {
    const resp = await fetcher.get<GetBakeryImageMenuBarResponse>(`/bakeries/${bakeryId}/image-bar`);
    return resp.data;
  }
}
