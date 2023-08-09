import React from 'react';
import type { TableProps } from '@/components/Shared';
import { Error as Empty, Table } from '@/components/Shared';
import styled from '@emotion/styled';

export const HomeRankingModalTable = ({ headers, rows, event }: TableProps) => {
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
