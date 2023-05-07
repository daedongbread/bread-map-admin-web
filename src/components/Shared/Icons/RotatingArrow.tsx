import * as React from 'react';
import styled from '@emotion/styled';

type RotatingArrowProps = {
  direction: 'left' | 'right';
};

export const RotatingArrow = ({ direction = 'left' }: RotatingArrowProps) => (
  <Arrow direction={direction} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <circle cx="12" cy="12" r="11" stroke="#808080" fill="#ffffff" />
    <path d="M14 8.5L9 12L14 15.5" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Arrow>
);

const Arrow = styled.svg<{ direction: string }>`
  transition: transform 0.5s;
  transform-origin: center;
  transform: ${({ direction }) => (direction === 'left' ? 'rotate(0)' : 'rotate(-180deg)')};
`;
