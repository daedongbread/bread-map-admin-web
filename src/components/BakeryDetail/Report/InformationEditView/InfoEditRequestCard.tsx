import dayjs from 'dayjs';
import React from 'react';
import { BakeryInfoUpdateRequestEntity } from '@/apis';
import { Button, ReadOnlyInputField } from '@/components/Shared';
import { FORMAT } from '@/constants';
import styled from '@emotion/styled';

type Props = {
  updateRequest: BakeryInfoUpdateRequestEntity;
  onCompleteRequest: (reportId: number) => void;
  onDeleteRequest: (reportId: number) => void;
};

export const InfoEditRequestCard = ({ updateRequest, onCompleteRequest, onDeleteRequest }: Props) => {
  const { reportId, createdAt, nickName, content, imageList } = updateRequest;

  const handleComplete = () => {
    onCompleteRequest(reportId);
  };

  const handleDelete = () => {
    onDeleteRequest(reportId);
  };

  return (
    <Container>
      <span className="date">{dayjs(createdAt).format(`${FORMAT.DATE_FULL_DOT} ${FORMAT.TIME_HH_MM_COLON}`)}</span>
      <div className="card">
        <div className="menu_info">
          <div className="input_area">
            <div className="max-w-230">
              <ReadOnlyInputField label={'제보자'} content={nickName} labelMinWidth={6} />
            </div>
            <ReadOnlyInputField label={'수정 사항'} type={'textarea'} multiLine content={content} labelMinWidth={6} />
          </div>
        </div>
      </div>
      <div className="bottom_wrapper">
        <div className="img_wrapper">
          {imageList.map((imageUrl, idx) => (
            <div className="img_item" key={`img-item-${idx}`}>
              <img src={imageUrl} alt={`제보자가 제공한 이미지 ${idx + 1}`} />
            </div>
          ))}
        </div>
        <div className="btn_wrapper">
          <Button type={'white'} text={'삭제하기'} btnSize={'small'} onClickBtn={handleDelete} />
          <Button type={'orange'} text={'변경 완료'} btnSize={'small'} onClickBtn={handleComplete} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
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
  }

  .input_area {
    > div {
      margin-bottom: 8px;
    }

    .max-w-230 {
      max-width: 230px;
    }

    .input_wrapper {
      display: flex;
      gap: 2rem;

      > img {
        width: 100%;
        min-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .bottom_wrapper {
    display: flex;
    justify-content: space-between;
    padding-left: 5.85rem;

    .img_wrapper {
      display: flex;
      justify-content: flex-start;

      .img_item {
        display: flex;
        justify-content: center;
        align-items: center;
        object-fit: cover;
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.gray200};
        overflow: hidden;

        > img {
          width: 100%;
          min-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .btn_wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: baseline;
      gap: 5px;
    }
  }
`;
