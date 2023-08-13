import { createContext, useContext } from 'react';
import { HomeCarousel } from '@/apis/homeCarousel';

export const HomeCarouselApiContext = createContext<{ homeCarousel: HomeCarousel | null }>({ homeCarousel: null });

export const useHomeCarouselApi = () => {
  return useContext(HomeCarouselApiContext);
};
