import React, { ReactNode } from 'react';
import { HomeCarousel, HomeCarouselClient } from '@/apis/homeCarousel';
import { HomeCarouselApiContext } from '@/context/homeCarousel/HomeCarouselApiContext';

const client = new HomeCarouselClient();
const homeCarousel = new HomeCarousel(client);

export const HomeCarouselApiProvider = ({ children }: { children: ReactNode }) => {
  return <HomeCarouselApiContext.Provider value={{ homeCarousel }}>{children}</HomeCarouselApiContext.Provider>;
};
