import React from 'react';
import { Button, Preview } from '@/components/Shared';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  previewImg: string | null;
  onChangeBakeryImg: () => void;
};

export const BakeryImgField = ({ label, previewImg, onChangeBakeryImg }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview src={previewImg || ''} widthRem={28} heightRem={20} emptyText={'대표 이미지가 없습니다.'} />
        <Button type={'lightOrange'} text={'이미지 변경'} btnSize={'small'} onClickBtn={onChangeBakeryImg} />
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
