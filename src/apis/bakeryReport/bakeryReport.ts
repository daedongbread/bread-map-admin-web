import { BakeryReportApiClient, GetBakeriesPayload, GetBakeryReportPayload, UpdateReportStatusPayload } from '@/apis';
import { fetcher } from '@/apis/axios';

export class BakeryReport {
  constructor(public client: BakeryReportApiClient) {}

  async getItem({ reportId }: GetBakeryReportPayload) {
    const item = await this.client.getItem({ reportId });
    return item;
  }

  async updateItemStatus({ reportId, status }: UpdateReportStatusPayload) {
    await updateItemStatus({ reportId, status });
    // await this.client.updateItemStatus({ reportId, status });
  }

  async getList({ page }: Omit<GetBakeriesPayload, 'name' | 'filterBy'>) {
    const list = await this.client.getList({ page });
    return list;
  }
}

// TODO: mutation error로 인해 임시로 설정
const updateItemStatus = async ({ reportId, status }: UpdateReportStatusPayload) => {
  await fetcher.patch(`/bakery-add-reports/${reportId}`, { status });
};
