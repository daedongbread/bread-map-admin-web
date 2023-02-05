import { useQuery } from 'react-query';
import { GetBakeriesPayload } from '@/apis';
import { useBakeryApi } from '@/context/bakery';

export const useBakeries = () => {
  const { bakery } = useBakeryApi();

  if (!bakery) {
    throw new Error('bakeryApi를 확인해주세요.');
  }

  const bakeriesQuery = ({ name, page }: GetBakeriesPayload) => {
    return useQuery(['getBakeries', { page }], () => bakery.getList({ page }), {
      enabled: !isNaN(page) && !name,
    });
  };

  const searchBakeriesQuery = ({ name, page }: GetBakeriesPayload) => {
    return useQuery(['searchBakeries', { name, page }], () => bakery.searchList({ name, page }), {
      enabled: !isNaN(page) && !!name,
    });
  };

  return { bakeriesQuery, searchBakeriesQuery };
};
