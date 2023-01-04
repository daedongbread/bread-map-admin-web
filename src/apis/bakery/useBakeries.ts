import { useQuery } from 'react-query';
import { getBakeries, GetBakeriesPayload, searchBakeries } from './bakery';

export const useBakeries = () => {
  const bakeriesQuery = ({ name, page }: GetBakeriesPayload) => {
    return useQuery(['getBakeries', { page }], () => getBakeries({ page }), {
      enabled: !isNaN(page) && !name,
    });
  };

  const searchBakeriesQuery = ({ name, page }: GetBakeriesPayload) => {
    return useQuery(['searchBakeries', { name, page }], () => searchBakeries({ name, page }), {
      enabled: !isNaN(page) && !!name,
    });
  };

  return { bakeriesQuery, searchBakeriesQuery };
};
