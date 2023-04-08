import React from 'react';
import { CheckLine } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  isCurrent: boolean;
  isSelected: boolean;
  isCompleted: boolean;
  imageId: number;
  imageSrc: string;
  handleClickPreviewImage: (imageId: number) => void;
};

export const SelectPreviewImg = ({ isCurrent, isSelected, isCompleted, imageId, imageSrc, handleClickPreviewImage }: Props) => {
  const onClickImage = () => {
    handleClickPreviewImage(imageId);
  };

  return (
    <Container isCurrent={isCurrent} isCompleted={isCompleted} onClick={onClickImage}>
      <ImgContainer>
        <img src={imageSrc} alt={'빵 메뉴 제보 이미지'} />
      </ImgContainer>
      <StatusContainer isCurrent={isCurrent} isSelected={isSelected} isCompleted={isCompleted}>
        {isCompleted && <StatusBadge>추가완료</StatusBadge>}
        {!isCompleted && isSelected && (
          <Circle>
            <CheckLine />
          </Circle>
        )}
      </StatusContainer>
    </Container>
  );
};

const Container = styled.div<Pick<Props, 'isCurrent' | 'isCompleted'>>`
  border-radius: 10px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 8rem;
  height: 8rem;

  border: ${({ isCurrent, theme }) => (isCurrent ? `3.5px solid ${theme.color.primary500}` : '3.5px solid transparent')};
  cursor: pointer;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  position: relative;
  height: inherit;
  width: inherit;

  > img {
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StatusContainer = styled.div<Pick<Props, 'isCurrent' | 'isSelected' | 'isCompleted'>>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isCurrent, isSelected, isCompleted }) => (isCurrent || isSelected || isCompleted ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)')};
`;

const Circle = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.primary500};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusBadge = styled.div`
  border-radius: 25px;
  padding: 3px 6px;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: ${({ theme }) => theme.color.white};
`;
