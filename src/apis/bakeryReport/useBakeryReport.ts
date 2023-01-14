import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBakeryReport, updateBakeryReportStatus } from './bakeryReport';

export const useBakeryReport = ({ reportId }: { reportId: number }) => {
  const queryClient = useQueryClient();

  const bakeryReportQuery = useQuery(['bakeryReport', { reportId }], () => getBakeryReport({ reportId }), {
    enabled: Boolean(reportId),
  });

  const editBakeryReportStatus = useMutation(updateBakeryReportStatus, {
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
