import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

type Props = {
  totalCount: number;
  filter: ReactNode;
  searchBtn: ReactNode;
};

export const BakeryInfoAndFilter = ({ totalCount, filter, searchBtn }: Props) => {
  return (
    <Container>
      <Total>
        <div>총 등록 빵집</div>
        <div>{totalCount.toLocaleString()}</div>
      </Total>
      <FilterContainer>
        <div className="count">
          <div>미확인 알람</div>
          <div>125</div>
        </div>
        {filter}
        {searchBtn}
      </FilterContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
`;

const Total = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 16px;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 16px;
  padding: 1rem 1.6rem;

  .count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2.2rem;
  }
`;
