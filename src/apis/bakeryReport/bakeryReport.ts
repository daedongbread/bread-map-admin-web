import { BakeryReportApiClient, GetBakeriesPayload, GetBakeryReportPayload, UpdateReportStatusPayload } from '@/apis';

export class BakeryReport {
  constructor(public client: BakeryReportApiClient) {}

  async getItem({ reportId }: GetBakeryReportPayload) {
    const item = await this.client.getItem({ reportId });
    return item;
  }

  async updateItemStatus({ reportId, status }: UpdateReportStatusPayload) {
    await this.client.updateItemStatus({ reportId, status });
  }

  async getList({ page }: Omit<GetBakeriesPayload, 'name'>) {
    const list = await this.client.getList({ page });
    return list;
  }
}
