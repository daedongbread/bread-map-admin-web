import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useBakeryReportApi } from '@/context/bakeryReport';

export const useBakeryReport = ({ reportId }: { reportId: number }) => {
  const { bakeryReport } = useBakeryReportApi();
  const queryClient = useQueryClient();

  if (!bakeryReport) {
    throw new Error('bakeryReportApi를 확인해주세요.');
  }

  const bakeryReportQuery = useQuery(['bakeryReport', { reportId }], () => bakeryReport.getItem({ reportId }), {
    enabled: Boolean(reportId),
  });

  const editBakeryReportStatus = useMutation(bakeryReport.updateItemStatus, {
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries('bakeryReport'),
        queryClient.invalidateQueries('bakeryReports'),
        queryClient.invalidateQueries('menuCount'),
      ]);
    },
  });

  return { bakeryReportQuery, editBakeryReportStatus };
};
