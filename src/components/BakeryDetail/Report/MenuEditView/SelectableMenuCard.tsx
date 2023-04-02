import React, { useState } from 'react';
import { BakeryMenuReportItemEntity } from '@/apis';
import { Button, ReadOnlyInputField, SelectableImg, SelectPreviewImg } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  menuReport: BakeryMenuReportItemEntity;
};

export const SelectableMenuCard = ({ menuReport }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Container>
      <span className="date">{menuReport.createdAt}</span>
      <div className="card">
        <SelectableImg imageSrc={menuReport.imageList[currentImage].image} isSelected={true} />
        <div className="menu_info">
          <div className="input_area">
            <ReadOnlyInputField label={'메뉴명'} content={menuReport.name} copyable />
            <div className="input_wrapper">
              <ReadOnlyInputField label={'가격'} content={menuReport.price} copyable />
              <ReadOnlyInputField label={'제보자'} content={menuReport.nickName} copyable />
            </div>
          </div>
          <div className="grid_view">
            {menuReport.imageList.map((item, idx) => (
              <SelectPreviewImg
                key={`select-preview-${item.imageId}`}
                isCurrent={currentImage === idx}
                isSelected={currentImage === idx}
                isCompleted={item.isRegistered}
                imageSrc={item.image}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="btn_wrapper">
        <Button type={'white'} text={'삭제하기'} btnSize={'small'} />
        <Button type={'orange'} text={'사진추가'} btnSize={'small'} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 68rem;

  .date {
    font-size: 1.6rem;
    display: inline-block;
    margin-bottom: 1rem;
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
