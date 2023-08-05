import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  onChangeForm: (payload: { name: string; value: string }) => void;
};

export const CurationBannerImgField = ({ label, onChangeForm }: Props) => {
  const { bakeryId } = useParams();
  const dispatch = useAppDispatch();
  const {
    form: { thumbnailUrl },
  } = useAppSelector(selector => selector.homeFeed);
  const { inputRef, onClickTriggerFile } = useFileInput();

  // const onChangeBakeryImg = () => {
  //   const bakeryImage: ImageUploaderInfo = {
  //     url: image || '',
  //     type: 'image',
  //     name: '대표 이미지',
  //   };
  //   dispatch(changeCurrentImageUploader(bakeryImage));
  // };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    // 실제로 이미지가 등록되었을때 실행
    if (!e.target.files) return;
    const file = e.target.files[0];

    onChangeForm({ name: 'thumbnailUrl', value: URL.createObjectURL(file) });
  };

  // const handleClickPreview = () => {
  //   inputRef.current?.click();
  // };

  return (
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview src={thumbnailUrl || ''} widthRem={28} heightRem={20} emptyText={'클릭 후 이미지 업로드'} onClick={onClickTriggerFile} />
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
