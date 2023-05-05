import dayjs from 'dayjs';
import React, { useState } from 'react';
import { BakeryMenuReportImageEntity, BakeryMenuReportItemEntity } from '@/apis';
import { Button, ReadOnlyInputField, SelectableImg, SelectPreviewImg } from '@/components/Shared';
import { FORMAT } from '@/constants';
import styled from '@emotion/styled';

type Props = {
  menuReport: BakeryMenuReportItemEntity;
  onChangeMenuReportImages: (reportId: number, imageIdList: number[]) => void;
  onDeleteMenuReport: (reportId: number) => void;
};

export const SelectableMenuCard = ({ menuReport, onChangeMenuReportImages, onDeleteMenuReport }: Props) => {
  const { imageList, reportId, createdAt, name, price, nickName } = menuReport;

  const [currentImage, setCurrentImage] = useState<BakeryMenuReportImageEntity | null>(imageList.find(i => !i.isRegistered) || null);
  const [selectedImageIds, setSelectedImageIds] = useState(imageList.length > 0 ? [imageList[0].imageId] : []);

  const isSavedAllImage = !imageList.some(i => !i.isRegistered);

  const onUpdate = () => {
    if (selectedImageIds.length === 0) {
      window.alert('선택된 이미지가 없습니다.');
      return;
    }
    onChangeMenuReportImages(reportId, selectedImageIds);
  };

  const onDelete = () => {
    onDeleteMenuReport(reportId);
  };

  const handleSelectImage = (imageId: number) => {
    const target = imageList.find(i => i.imageId === imageId);
    if (target?.isRegistered) {
      return;
    }
    setSelectedImageIds(prev => (prev.includes(imageId) ? prev.filter(id => id !== imageId) : [...prev, imageId]));
  };

  const handleClickPreviewImage = (imageId: number) => {
    setCurrentImage(imageList.find(image => image.imageId === imageId) || null);
  };

  return (
    <Container>
      <span className="date">{dayjs(createdAt).format(`${FORMAT.DATE_FULL_DOT} ${FORMAT.TIME_HH_MM_COLON}`)}</span>
      <div className="card">
        <SelectableImg currentImage={currentImage} isSelected={selectedImageIds.includes(currentImage?.imageId || -1)} handleSelectImage={handleSelectImage} />
        <div className="menu_info">
          <div className="input_area">
            <ReadOnlyInputField label={'메뉴명'} content={name} copyable />
            <div className="input_wrapper">
              <ReadOnlyInputField label={'가격'} content={price} isPrice copyable />
              <ReadOnlyInputField label={'제보자'} content={nickName} />
            </div>
          </div>
          <div className="grid_view">
            {imageList.map(item => (
              <SelectPreviewImg
                key={`select-preview-${item.imageId}`}
                isCurrent={currentImage?.imageId === item.imageId}
                isSelected={selectedImageIds.includes(item.imageId)}
                isCompleted={item.isRegistered}
                imageId={item.imageId}
                imageSrc={item.image}
                handleClickPreviewImage={handleClickPreviewImage}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="btn_wrapper">
        <Button type={'white'} text={'삭제하기'} btnSize={'small'} onClickBtn={onDelete} />
        <Button type={'orange'} text={'사진추가'} btnSize={'small'} disabled={isSavedAllImage} onClickBtn={onUpdate} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 68rem;
  padding: 1.6rem 0;

  .date {
    font-size: 1.5rem;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.color.gray700};
  }

  .card {
    display: flex;
  }

  .menu_info {
    flex: 1;
    margin-left: 1rem;
  }

  .input_area {
    > div {
      margin-bottom: 5px;
    }

    .input_wrapper {
      display: flex;
      gap: 2rem;
    }
  }

  .grid_view {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 3px;
  }

  .btn_wrapper {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }
`;
