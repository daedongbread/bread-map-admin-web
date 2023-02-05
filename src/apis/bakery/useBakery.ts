import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useBakeryApi } from '@/context/bakery';

export const useBakery = ({ bakeryId }: { bakeryId: number }) => {
  const { bakery } = useBakeryApi();
  const queryClient = useQueryClient();

  if (!bakery) {
    throw new Error('bakeryApi를 확인해주세요.');
  }

  const bakeryQuery = useQuery(['bakery', { bakeryId }], () => bakery.getItem({ bakeryId }), {
    enabled: !isNaN(bakeryId),
  });

  const addBakery = useMutation(bakery.createItem, {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });

  const editBakery = useMutation(bakery.updateItem, {
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries('bakery'), queryClient.invalidateQueries('getBakeries'), queryClient.invalidateQueries('menuCount')]);
    },
  });

  return { bakeryQuery, addBakery, editBakery };
};
