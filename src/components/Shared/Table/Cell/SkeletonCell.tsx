import React from 'react';
import styled from '@emotion/styled';

export const SkeletonCell = () => {
  return <GrayCell />;
};

const GrayCell = styled.div`
  width: 80%;
  max-width: 15rem;
  min-width: 5rem;
  height: 1.7rem;
  background: ${({ theme }) => theme.color.gray100};
  margin: 0 auto;
  border-radius: 5px;
`;
