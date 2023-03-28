import React, { ChangeEvent, useState } from 'react';
import { Button, Preview } from '@/components/Shared';
import { FileImage } from '@/components/Shared/FileImage';
import useFileInput from '@/hooks/useFileInput';
import styled from '@emotion/styled';
import hamburger from '/images/hamburger.png';

export const ImageDiffUploader = () => {
  const [image, setImage] = useState('');
  const { inputRef, onClickTriggerFile, getSrc } = useFileInput();

  const onChangeBakeryImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    setImage(imgPreview);
  };

  return (
    <Container>
      <div className="chg_wrapper">
        <div>
          <label className="image_label">현재 이미지</label>
          <Preview src={hamburger} widthRem={28} heightRem={19} emptyText={'대표 이미지가 없습니다.'} />
          <span className="image_title">대표 이미지</span>
        </div>
        <div className="ml_6">
          <label className="image_label">변경 이미지</label>
          <FileImage src={getSrc(image)} widthRem={28} heightRem={19} onClickTriggerFile={onClickTriggerFile} />
          <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={onChangeBakeryImg} />
        </div>
        <div className="btn_wrapper">
          <Button type={'lightGray'} text={'반영하기'} btnSize={'small'} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .chg_wrapper {
    display: flex;

    .image_label {
      display: inline-block;
      font-size: 14px;
      margin-bottom: 14px;
    }

    .image_title {
      width: 100%;
      height: 30px;
      display: inline-flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
    }

    .ml_6 {
      margin-left: 20px;
    }

    .btn_wrapper {
      display: flex;
      justify-content: flex-end;
      margin-left: 26px;
      align-items: end;
      margin-bottom: 30px;
    }
  }
`;
