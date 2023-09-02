import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeCurrentImageUploader, ImageUploaderInfo } from '@/store/slices/bakery';
import styled from '@emotion/styled';

type Props = {
  label: string;
  onChangeForm: (payload: { name: 'image'; value: string }) => void;
};

export const BakeryImgField = ({ label, onChangeForm }: Props) => {
  const { bakeryId } = useParams();
  const dispatch = useAppDispatch();
  const {
    form: { images },
  } = useAppSelector(selector => selector.bakery);
  const { inputRef, onClickTriggerFile } = useFileInput();

  const onChangeBakeryImg = () => {
    const bakeryImage: ImageUploaderInfo = {
      url: images ? images[0] || '' : '',
      type: 'image',
      name: '대표 이미지1',
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

    onChangeForm({ name: 'image', value: URL.createObjectURL(file) });
  };

  return (
    <Container alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview src={images ? images[0] || '' : ''} widthRem={28} heightRem={20} emptyText={'클릭 후 이미지 업로드.'} onClick={handleClickBtn} />
        <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={handleChangeImage} />
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
