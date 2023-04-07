import React from 'react';
import styled from '@emotion/styled';

type PreviewProps = {
  src?: string;
  widthRem: number;
  heightRem: number;
  emptyText: string;
};

// TODO img 가로,세로 계산해서 fit하게 해주는 작업 필요
export const Preview = ({ src, widthRem, heightRem, emptyText }: PreviewProps) => {
  return (
    <Container widthRem={widthRem} heightRem={heightRem}>
      {src ? <img src={src} alt={'미리보기'} /> : <span>{emptyText}</span>}
    </Container>
  );
};

const Container = styled.div<{ widthRem: number; heightRem: number }>`
  background-color: ${({ theme }) => theme.color.gray100};
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 10px;
  width: ${({ widthRem }) => `${widthRem}rem`};
  height: ${({ heightRem }) => `${heightRem}rem`};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  object-fit: cover;
  overflow: hidden;

  > span {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.gray500};
  }

  > input {
    position: absolute;
    top: 0;
  }

  > img {
    min-width: 100%;
  }
`;
