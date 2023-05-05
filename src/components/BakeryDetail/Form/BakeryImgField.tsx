import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BakeryFormChangeKey, changeCurrentImageUploader, ImageUploaderInfo } from '@/store/slices/bakery';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: string }) => void;
};

export const BakeryImgField = ({ label, onChangeForm }: Props) => {
  const { bakeryId } = useParams();
  const dispatch = useAppDispatch();
  const {
    form: { image },
  } = useAppSelector(selector => selector.bakery);
  const { inputRef, onClickTriggerFile } = useFileInput();

  const onChangeBakeryImg = () => {
    const bakeryImage: ImageUploaderInfo = {
      url: image || '',
      type: 'image',
      name: '대표 이미지',
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
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview src={image || ''} widthRem={28} heightRem={20} emptyText={'대표 이미지가 없습니다.'} />
        <Button type={'lightOrange'} text={'이미지 변경'} btnSize={'small'} onClickBtn={handleClickBtn} />
        <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={handleChangeImage} />
      </RepresentativeImg>
    </Row>
  );
};

const RepresentativeImg = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;
