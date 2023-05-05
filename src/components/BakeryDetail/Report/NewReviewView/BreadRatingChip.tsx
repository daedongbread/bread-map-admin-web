import React from 'react';
import { Star } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  name: string;
  rating: number;
};

export const BreadRatingChip = ({ name, rating }: Props) => {
  return (
    <Container>
      <span className="name">{name}</span>
      <Star />
      <span className="rating">{rating}</span>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.gray100};
  padding: 4px 8px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  font-weight: 600;
  border-radius: 4px;

  .name {
    margin-right: 5px;
    color: ${({ theme }) => theme.color.gray800};
  }
  .rating {
    margin-left: 1px;
    color: ${({ theme }) => theme.color.primary500};
  }
`;
