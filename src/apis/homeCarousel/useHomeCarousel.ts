import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UpdateHomeCarouselPayload } from '@/apis/homeCarousel/types';
import { useHomeCarouselApi } from '@/context/homeCarousel/HomeCarouselApiContext';

export const useHomeCarousel = () => {
  const { homeCarousel } = useHomeCarouselApi();
  const queryClient = useQueryClient();

  if (!homeCarousel) {
    throw new Error('homeCarouselApi를 확인해주세요.');
  }

  const getHomeCarousels = () => {
    return useQuery(['homeCarousels'], () => homeCarousel.getList());
  };

  const updateHomeCarousels = useMutation((payload: UpdateHomeCarouselPayload) => homeCarousel.update(payload), {
    onSuccess: () => Promise.all([queryClient.invalidateQueries('homeCarousels')]),
  });

  return {
    getHomeCarousels,
    updateHomeCarousels,
  };
};
