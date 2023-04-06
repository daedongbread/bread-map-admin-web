import React from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  count: number;
};

export const ReportTabTitle = ({ title, count }: Props) => {
  return (
    <Title>
      <span>{title}</span>
      <span className="count">{count}</span>
    </Title>
  );
};

const Title = styled.div`
  display: inline-block;
  margin-right: 2rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray700};

  &:not(:first-of-type) {
  }

  .count {
    margin-left: 3px;
    color: ${({ theme }) => theme.color.primary500};
  }
`;
