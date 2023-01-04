import { useQuery } from 'react-query';
import { getBakeryReports, GetBakeryReportsPayload } from './bakeryReport';

export const useBakeryReports = () => {
  const bakeryReportsQuery = ({ page }: GetBakeryReportsPayload) => {
    return useQuery(['bakeryReports', { page }], () => getBakeryReports({ page }), {
      enabled: !isNaN(page),
    });
  };

  return { bakeryReportsQuery };
};
