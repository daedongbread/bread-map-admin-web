import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

type ToastContainerProps = {
  children: ReactNode;
};

export const ToastContainer = ({ children }: ToastContainerProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateX(-50%);
`;
