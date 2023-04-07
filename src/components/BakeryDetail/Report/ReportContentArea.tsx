import React, { ReactNode } from 'react';
import { Error as Empty } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  isEmpty: boolean;
  emptyAreaName: string;
  children: ReactNode;
};

export const ReportContentArea = ({ isEmpty, emptyAreaName, children }: Props) => {
  return isEmpty ? (
    <EmptyContainer>
      <Empty errMsg={`${emptyAreaName}가 없습니다.`} />
    </EmptyContainer>
  ) : (
    <Container>{children}</Container>
  );
};

const EmptyContainer = styled.div`
  min-height: 60vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  margin-bottom: 8rem;
`;
