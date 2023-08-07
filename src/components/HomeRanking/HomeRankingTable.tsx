import React from 'react';
import { Error as Empty, Table } from '@/components/Shared';
import type { TableProps } from '@/components/Shared';
import { PATH } from '@/constants';
import styled from '@emotion/styled';

const event = {
  hover: {
    on: true,
  },
  move: {
    on: true,
    basePath: PATH.HomeScreen.Ranking,
  },
};

export const HomeRankingTable = ({ headers, rows }: TableProps) => {
  if (!rows.length) {
    return (
      <EmptyContainer>
        <Empty errMsg={'검색 결과가 없습니다.'} />
      </EmptyContainer>
    );
  }
  return <Table headers={headers} rows={rows} event={event} />;
};

const EmptyContainer = styled.div`
  height: 70rem;
  display: flex;
  justify-content: center;
`;
