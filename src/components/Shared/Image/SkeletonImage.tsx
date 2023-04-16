import React from 'react';
import styled from '@emotion/styled';

export const SkeletonImage = () => {
  return <GrayImage />;
};

const GrayImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: inherit;
  width: inherit;
  background-color: ${({ theme }) => theme.color.gray100};
`;
