import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeCurrentImageUploader, ImageUploaderInfo } from '@/store/slices/bakery';
import styled from '@emotion/styled';

type Props = {
  label: string;
  onChangeForm: (payload: { name: 'images'; value: string[] }) => void;
  onRemoveForm: (payload: { name: 'images' }) => void;
};

export const BakerySecondImgField = ({ label, onChangeForm, onRemoveForm }: Props) => {
  const { bakeryId } = useParams();
  const dispatch = useAppDispatch();
  const {
    form: { images },
  } = useAppSelector(selector => selector.bakery);
  const { inputRef, onClickTriggerFile } = useFileInput();

  const onChangeBakeryImg = () => {
    const bakeryImage: ImageUploaderInfo = {
      url: images ? images[1] || '' : '',
      type: 'image',
      name: '대표 이미지2',
    };
    dispatch(changeCurrentImageUploader(bakeryImage));
  };

  // 생성시에는 이미지 로컬 등록, 수정시에는 Report 컴포넌트에서 수정되도록
  const handleClickBtn = () => {
    bakeryId ? onChangeBakeryImg() : onClickTriggerFile();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    onChangeForm({
      name: 'images',
      value: [images && images.length > 0 ? images[0] : '', URL.createObjectURL(file)],
    });
  };

  return (
    <Container alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <ImageFieldContainer>
          {images && images[1] && (
            <CloseButton
              onClick={e => {
                e.preventDefault();
                onRemoveForm({ name: 'images' });
              }}
            >
              X
            </CloseButton>
          )}
          <div onClick={handleClickBtn}>
            <Preview src={images ? images[1] || '' : ''} widthRem={28} heightRem={20} emptyText={'클릭 후 이미지 업로드.'} />
          </div>
          <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={handleChangeImage} />
        </ImageFieldContainer>
      </RepresentativeImg>
    </Container>
  );
};

const Container = styled.div<{ alignTop?: boolean; spaceBetween?: boolean; noMargin?: boolean }>`
  display: flex;
  align-items: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};
  justify-content: ${({ spaceBetween }) => (spaceBetween ? 'space-between' : 'flex-start')};

  > label {
    width: 12rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:not(label) {
    flex: 1;
  }
`;

const RepresentativeImg = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;

const ImageFieldContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CloseButton = styled.button`
  position: absolute;
  right: -10px;
  top: -10px;
  background: white;
  color: ${({ theme }) => `${theme.color.primary500}`};
  border: ${({ theme }) => `2px solid ${theme.color.primary500}`};
  border-radius: 50%; /* 버튼 모양을 원형으로 만듭니다 */
  padding: 5px;
  cursor: pointer;
  width: 20px; /* 원형의 경우 너비와 높이를 명시적으로 설정해야 합니다 */
  height: 20px; /* 원형의 경우 너비와 높이를 명시적으로 설정해야 합니다 */
  display: flex; /* 아래의 justify-content와 align-items를 이용해 X를 중앙에 위치시킵니다 */
  justify-content: center;
  align-items: center;
`;
