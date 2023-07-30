import React, { ChangeEvent } from 'react';
import { Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { BakeryFormChangeKey, ImageUploaderInfo } from '@/store/slices/bakery';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  imageUrl: string;
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: string }) => void;
};

export const SingleImageField = ({ label, imageUrl, onChangeForm }: Props) => {
  const { inputRef, onClickTriggerFile } = useFileInput();

  const onChangeImage = () => {
    const image: ImageUploaderInfo = {
      url: '',
      type: 'image',
      name: '대표 이미지',
    };
  };

  // 생성시에는 이미지 로컬 등록, 수정시에는 Report 컴포넌트에서 수정되도록
  const handleClickBtn = () => {
    imageUrl ? onChangeImage() : onClickTriggerFile();
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
        <div onClick={handleClickBtn}>
          <Preview src={imageUrl || ''} widthRem={38} heightRem={20} emptyText={'클릭 후 이미지 업로드'} />
        </div>
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
