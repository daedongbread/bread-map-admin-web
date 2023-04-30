import { useQuery } from 'react-query';
import { GetBakeriesPayload } from '@/apis';
import { useBakeryApi } from '@/context/bakery';

export const useBakeries = () => {
  const { bakery } = useBakeryApi();

  if (!bakery) {
    throw new Error('bakeryApi를 확인해주세요.');
  }

  const bakeriesQuery = ({ name, page, filterBy }: GetBakeriesPayload) => {
    return useQuery(['getBakeries', { name, page, filterBy }], () => bakery.getList({ page, name, filterBy }), {
      enabled: !isNaN(page),
    });
  };

  return { bakeriesQuery };
};
