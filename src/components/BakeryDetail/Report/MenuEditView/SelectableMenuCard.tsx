import React from 'react';
import { Button, ReadOnlyInputField, SelectableImg, SelectPreviewImg } from '@/components/Shared';
import styled from '@emotion/styled';

export const SelectableMenuCard = () => {
  return (
    <Container>
      <span className="date">2021.03.11</span>
      <div className="card">
        <SelectableImg isSelected={true} />
        <div className="menu_info">
          <div className="input_area">
            <ReadOnlyInputField label={'메뉴명'} content={'대파명란바게트'} copyable />
            <div className="input_wrapper">
              <ReadOnlyInputField label={'가격'} content={'가격'} copyable />
              <ReadOnlyInputField label={'제보자'} content={'제보자'} copyable />
            </div>
          </div>
          <div className="grid_view">
            {Array(9)
              .fill(0)
              .map((item, idx) => (
                <SelectPreviewImg key={`select-preview-idx-${idx}`} isCurrent={true} isSelected={true} isCompleted={false} />
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
