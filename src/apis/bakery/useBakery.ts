import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createBakery, getBakery, updateBakery } from './bakery';

export const useBakery = ({ bakeryId }: { bakeryId: number }) => {
  const queryClient = useQueryClient();

  const bakeryQuery = useQuery(['bakery', { bakeryId }], () => getBakery({ bakeryId }), {
    enabled: !isNaN(bakeryId),
  });

  const addBakery = useMutation(createBakery, {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });

  const editBakery = useMutation(updateBakery, {
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries('bakery'), queryClient.invalidateQueries('getBakeries'), queryClient.invalidateQueries('menuCount')]);
    },
  });

  return { bakeryQuery, addBakery, editBakery };
};
