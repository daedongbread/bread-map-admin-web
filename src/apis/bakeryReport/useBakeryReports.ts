import { useQuery } from 'react-query';
import { GetBakeryReportsPayload } from '@/apis';
import { useBakeryReportApi } from '@/context/bakeryReport';

export const useBakeryReports = () => {
  const { bakeryReport } = useBakeryReportApi();

  if (!bakeryReport) {
    throw new Error('bakeryReportApi를 확인해주세요.');
  }

  const bakeryReportsQuery = ({ page }: GetBakeryReportsPayload) => {
    return useQuery(['bakeryReports', { page }], () => bakeryReport.getList({ page }), {
      enabled: !isNaN(page),
    });
  };

  return { bakeryReportsQuery };
};
