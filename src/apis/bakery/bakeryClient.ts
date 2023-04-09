import {
  BakeryApiClient,
  BakeryDetailEntity,
  CompleteBakeryInfoUpdateRequestPayload,
  CreateUpdateBakeryPayload,
  DeleteBakeryImagePayload,
  DeleteBakeryInfoUpdateRequestPayload,
  DeleteBakeryMenuReportPayload,
  GetBakeriesPayload,
  GetBakeriesResponse,
  GetBakeryImagePayload,
  GetBakeryImageResponse,
  GetBakeryInfoUpdateRequestsPayload,
  GetBakeryInfoUpdateRequestsResponse,
  GetBakeryMenuReportPayload,
  GetBakeryMenuReportsResponse,
  UpdateBakeryMenuReportImagesPayload,
  UploadImagePayload,
  UploadImageResponse,
} from '@/apis';
import { fetcher } from '@/apis/axios';

export class BakeryClient implements BakeryApiClient {
  async getItem({ bakeryId }: { bakeryId: number }) {
    const resp = await fetcher.get<BakeryDetailEntity>(`bakeries/${bakeryId}`);
    return resp.data;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    await fetcher.post('bakeries', payload);
  }

  async updateItem({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) {
    await fetcher.patch(`bakeries/${bakeryId}`, payload);
  }

  async getList({ page }: Omit<GetBakeriesPayload, 'name'>) {
    const resp = await fetcher.get<GetBakeriesResponse>(`/bakeries`, { params: { page } });
    return { bakeries: resp.data.contents, totalCount: resp.data.totalElements, totalPages: resp.data.totalPages };
  }

  async searchList({ name, page }: GetBakeriesPayload) {
    const resp = await fetcher.get<GetBakeriesResponse>('/bakeries/search', { params: { name, page } });
    return { bakeries: resp.data.contents, totalCount: resp.data.totalElements, totalPages: resp.data.totalPages };
  }

  async getImageList({ bakeryId, imageType, page }: GetBakeryImagePayload) {
    const resp = await fetcher.get<GetBakeryImageResponse>(`/bakeries/${bakeryId}/images/${imageType}`, { params: { page } });
    return {
      images: resp.data.contents,
      totalCount: resp.data.totalElements,
      totalPages: resp.data.totalPages,
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
    return {
      menuReports: resp.data.contents,
      totalCount: resp.data.totalElements,
      totalPages: resp.data.totalPages,
    };
  }

  async updateBakeryMenuReportImages({ bakeryId, reportId, imageIdList }: UpdateBakeryMenuReportImagesPayload) {
    await fetcher.patch(`/bakeries/${bakeryId}/product-add-reports/${reportId}`, { imageIdList });
  }

  async deleteBakeryMenuReport({ bakeryId, reportId }: DeleteBakeryMenuReportPayload) {
    await fetcher.delete(`/bakeries/${bakeryId}/product-add-reports/${reportId}`);
  }

  async getBakeryInfoUpdateRequests({ bakeryId, page }: GetBakeryInfoUpdateRequestsPayload) {
    const resp = await fetcher.get<GetBakeryInfoUpdateRequestsResponse>(`/bakeries/${bakeryId}/update-reports`, { params: { page } });
    return {
      bakeryInfoUpdateRequests: resp.data.contents,
      totalCount: resp.data.totalElements,
      totalPages: resp.data.totalPages,
    };
  }

  async completeBakeryInfoUpdateRequest({ bakeryId, reportId }: CompleteBakeryInfoUpdateRequestPayload) {
    await fetcher.patch(`/bakeries/${bakeryId}/update-reports/${reportId}`);
  }

  async deleteBakeryInfoUpdateRequest({ bakeryId, reportId }: DeleteBakeryInfoUpdateRequestPayload) {
    await fetcher.delete(`/bakeries/${bakeryId}/update-reports/${reportId}`);
  }
}
