import React from 'react';
import styled from '@emotion/styled';

type CategoryChip = {
  color: string;
  bgColor: string;
  text: string;
};

export type Props = {
  category: CategoryChip[];
};

// TODO: category, alarm 합치기
export const FeedCategoryCell = ({ category }: Props) => {
  console.log('category..', category);
  return (
    <Container>
      {category?.map((category, idx) => (
        <Chip key={`${category.text}-${idx}-${Math.floor(Math.random() * 1000) + 1}`} color={category.color} bgColor={category.bgColor}>
          <span>{category.text}</span>
        </Chip>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Chip = styled.div<{ color: string; bgColor: string }>`
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  padding: 10px;
  height: 22px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;
