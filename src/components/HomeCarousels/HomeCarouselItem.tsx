import React from 'react';
import styled from '@emotion/styled';

type Props = {
  order: number;
  image?: string;
  title?: string;
};

export const HomeCarouselItem = ({ order, image, title }: Props) => {
  return (
    <Carousel>
      <CarouselNumberContainer>
        <h1>{order}</h1>
      </CarouselNumberContainer>
      <CarouselImageContainer image={image}>
        <span>{title}</span>
      </CarouselImageContainer>
    </Carousel>
  );
};

const Carousel = styled.div`
  display: flex;
  height: 13rem;
`;

const CarouselNumberContainer = styled.div`
  width: 3rem;
  background-color: ${({ theme }) => theme.color.primary500};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 2.5rem;
  margin-right: 0.5rem;
  border-radius: 10px;

  > h1 {
    color: white;
    font-size: 3rem;
    font-weight: 600;
  }
`;

const CarouselImageContainer = styled.div<{ image?: string }>`
  width: 40rem;
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-color: ${({ image, theme }) => (image ? 'transparent' : theme.color.gray200)};
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;

  > span {
    color: ${({ image, theme }) => (image ? 'white' : theme.color.gray500)};
    font-size: 1.8rem;
    font-weight: 600;
  }
`;
