import React from 'react';
import styled from '@emotion/styled';

type Props = {
  totalCount: number;
};

export const BakeryTotalCount = ({ totalCount }: Props) => {
  return (
    <Container>
      <span>총 등록 빵집</span>
      <span>{totalCount}</span>
    </Container>
  );
};

const Container = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 16px;
  padding: 13px;
  font-size: 1.6rem;
  > span {
    display: block;
    text-align: center;
  }
`;
