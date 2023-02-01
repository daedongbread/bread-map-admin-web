import React from 'react';
import { Circle } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

export type StatusCellProps = {
  color: string;
  text: string;
};

export const StatusCell = ({ color, text }: StatusCellProps) => {
  return (
    <Container color={color}>
      <div>
        <Circle fillcolor={color} />
      </div>
      <span>{text}</span>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin-right: 2.5px;
    width: 10px;
    height: 16px;
    position: relative;

    > svg {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-35%);
    }
  }

  span {
    color: ${({ color }) => color};
  }
`;
