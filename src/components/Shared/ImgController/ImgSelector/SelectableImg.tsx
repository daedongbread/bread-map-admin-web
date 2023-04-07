import React from 'react';
import { BakeryMenuReportImageEntity } from '@/apis';
import { Preview as EmptyPreview } from '@/components/Shared';
import { CheckLine } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  currentImage: BakeryMenuReportImageEntity | null;
  isSelected: boolean;
  handleSelectImage: (imageId: number) => void;
};

export const SelectableImg = ({ currentImage, isSelected, handleSelectImage }: Props) => {
  const onSelectImage = () => {
    if (!currentImage) return;
    handleSelectImage(currentImage?.imageId);
  };

  return (
    <div>
      {!currentImage && <EmptyPreview widthRem={25} heightRem={25} emptyText={'선택가능한 이미지가 없습니다.'} />}
      {currentImage && (
        <>
          <ImgContainer isRegistered={currentImage?.isRegistered}>
            <img src={currentImage?.image} alt={'빵 메뉴 제보 이미지'} />
            <CheckBox isSelected={isSelected} isRegistered={currentImage?.isRegistered} onClick={onSelectImage}>
              <CheckLine />
            </CheckBox>
          </ImgContainer>
        </>
      )}
    </div>
  );
};

const ImgContainer = styled.div<{ isRegistered: boolean }>`
  position: relative;
  width: 25rem;
  height: 25rem;
  border-radius: 1rem;
  overflow: hidden;
  object-fit: cover;

  > img {
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ isRegistered }) => (isRegistered ? 'rgba(0,0,0,0.5)' : 'none')};
  }
`;

const CheckBox = styled.div<{ isSelected: boolean; isRegistered: boolean }>`
  z-index: 2;
  visibility: ${({ isRegistered }) => (isRegistered ? 'hidden' : 'auto')};
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  background: ${({ isSelected, theme }) => (isSelected ? theme.color.primary500 : `rgba(0, 0, 0, 0.6)`)}; // 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;
