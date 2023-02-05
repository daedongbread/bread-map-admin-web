import {
  BakeryReportApiClient,
  BakeryReportsItemEntity,
  GetBakeriesPayload,
  GetBakeryReportPayload,
  GetBakeryReportsResponse,
  UpdateReportStatusPayload,
} from '@/apis';
import { fetcher } from '@/apis/axios';

export class BakeryReportClient implements BakeryReportApiClient {
  async getItem({ reportId }: GetBakeryReportPayload) {
    const resp = await fetcher.get<BakeryReportsItemEntity>(`/bakery/report/${reportId}`);
    return resp.data;
  }

  async updateItemStatus({ reportId, status }: UpdateReportStatusPayload) {
    await fetcher.patch(`/bakery/report/${reportId}`, { status });
  }

  async getList({ page }: Omit<GetBakeriesPayload, 'name'>) {
    const resp = await fetcher.get<GetBakeryReportsResponse>('/bakery/report', { params: { page } });
    return { bakeryReports: resp.data.contents, totalCount: resp.data.totalElements, totalPages: resp.data.totalPages };
  }
}
