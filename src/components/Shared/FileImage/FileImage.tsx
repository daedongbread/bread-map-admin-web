import React from 'react';
import { Button } from '@/components/Shared';
import styled from '@emotion/styled';

type FileImageProps = {
  src: string | null;
  widthRem: number;
  heightRem: number;
  onClickTriggerFile: () => void;
};

export const FileImage = ({ src, widthRem, heightRem, onClickTriggerFile }: FileImageProps) => {
  return (
    <Container widthRem={widthRem} heightRem={heightRem} onClick={onClickTriggerFile}>
      {src ? (
        <img src={src} />
      ) : (
        <div className="empty_image">
          <span>변경할 이미지를 선택해주세요.</span>
          <Button type={'lightGray'} text={'파일에서 선택'} btnSize={'small'} />
        </div>
      )}
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

  .empty_image {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span {
      font-size: 14px;
      color: ${({ theme }) => theme.color.gray400};
      margin-bottom: 14px;
    }
  }
`;
