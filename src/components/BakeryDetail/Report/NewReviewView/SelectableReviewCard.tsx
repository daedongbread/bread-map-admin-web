import dayjs from 'dayjs';
import React, { useState } from 'react';
import { BakeryMenuReportImageEntity, BakeryNewReviewEntity } from '@/apis';
import { BreadRatingChip } from '@/components/BakeryDetail/Report/NewReviewView/BreadRatingChip';
import { Button, ReadOnlyInputField, SelectableImg, SelectPreviewImg } from '@/components/Shared';
import { FORMAT } from '@/constants';
import styled from '@emotion/styled';

type Props = {
  newReview: BakeryNewReviewEntity;
  onChangeReviewImages: (reviewId: number, imageIdList: number[]) => void;
  onDeleteReview: (reviewId: number) => void;
  onHideReview: (reviewId: number) => void;
};

export const SelectableReviewCard = ({ newReview, onChangeReviewImages, onDeleteReview, onHideReview }: Props) => {
  const { imageList, reviewId, createdAt, nickName, productRatingList, content } = newReview;

  const [currentImage, setCurrentImage] = useState<BakeryMenuReportImageEntity | null>(imageList.find(i => !i.isRegistered) || null);
  const [selectedImageIds, setSelectedImageIds] = useState(imageList.length > 0 ? [imageList[0].imageId] : []);

  const isSavedAllImage = !imageList.some(i => !i.isRegistered);

  const onUpdate = () => {
    if (selectedImageIds.length === 0) {
      window.alert('선택된 이미지가 없습니다.');
      return;
    }
    onChangeReviewImages(reviewId, selectedImageIds);
  };

  const onDelete = () => {
    onDeleteReview(reviewId);
  };

  const onHide = () => {
    onHideReview(reviewId);
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
      <div className="input_area">
        <div className="input_wrapper">
          <ReadOnlyInputField label={'작성자'} content={nickName} copyable />
          <div className="rating_chip">
            <div className="chip_wrapper">
              <label>리뷰한 빵</label>
              {productRatingList.map((item, idx) => (
                <BreadRatingChip key={`review-rating-${idx}`} name={item.productName} rating={item.rating} />
              ))}
            </div>
          </div>
        </div>
        <ReadOnlyInputField label={'리뷰글'} type={'textarea'} multiLine content={Array(20).fill(content).join(',')} />
      </div>
      <div className="card">
        <SelectableImg currentImage={currentImage} isSelected={selectedImageIds.includes(currentImage?.imageId || -1)} handleSelectImage={handleSelectImage} />
        <div className="menu_info">
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
        <div className="btn_row">
          <Button type={'white'} text={'리스트 삭제'} btnSize={'small'} onClickBtn={onDelete} />
          <Button type={'orange'} text={'사진추가'} btnSize={'small'} disabled={isSavedAllImage} onClickBtn={onUpdate} />
        </div>
        <div>
          <Button type={'orange'} text={'앱에서 이 리뷰 삭제하기'} btnSize={'medium'} onClickBtn={onHide} />
        </div>
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
      margin-bottom: 1.3rem;
    }

    .input_wrapper {
      display: flex;
      align-items: flex-start;
      gap: 2rem;

      .rating_chip {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;

        label {
          width: 5.6rem;
          font-size: 1.3rem;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .chip_wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          width: 420px;
        }
      }
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
    flex-direction: column;
    align-items: flex-end;
    //justify-content: flex-end;
    gap: 5px;
    .btn_row {
      display: flex;
      gap: 5px;
    }
  }
`;
