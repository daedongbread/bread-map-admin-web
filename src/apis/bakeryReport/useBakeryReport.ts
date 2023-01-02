import { useMutation, useQuery } from 'react-query';
import { getBakeryReport, updateBakeryReportStatus } from './bakeryReport';

const useGetBakeryReport = ({ reportId }: { reportId: number }) => {
  const queryKey = ['bakeryReport', { reportId }] as const;
  const { data, isLoading, isError, refetch } = useQuery(queryKey, () => getBakeryReport({ reportId }), {
    enabled: Boolean(reportId),
  });

  return {
    bakeryReport: data,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

const useUpdateBakeryReportStatus = ({ successFn }: { successFn: () => Promise<void> }) => {
  const { mutate, isLoading, isError } = useMutation(updateBakeryReportStatus, {
    onSuccess: async () => {
      await successFn();
    },
    // onError: () => {},
  });
  return {
    mutate,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

export { useGetBakeryReport, useUpdateBakeryReportStatus };
