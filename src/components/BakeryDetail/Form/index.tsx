import React, { useCallback } from 'react';
import { AddressArea } from '@/components/BakeryDetail/Form/AddressArea';
import { BakeryImgField } from '@/components/BakeryDetail/Form/BakeryImgField';
import { FacilityField } from '@/components/BakeryDetail/Form/FacilityField';
import { MenuArea } from '@/components/BakeryDetail/Form/MenuArea';
import { SearchField } from '@/components/BakeryDetail/Form/SearchField';
import { SnsLinkArea } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm } from '@/store/slices/bakery';
import styled from '@emotion/styled';

type Props = {
  isEdit: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const BakeryForm = ({ isEdit, openModal }: Props) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(selector => selector.bakery);
  const { name, pioneerNickName, hours, phoneNumber, newBreadTime, checkPoint } = form;

  const onChangeForm = useCallback((payload: { name: string; value: string }) => {
    dispatch(changeForm(payload));
  }, []);

  return (
    <Container>
      <TextField label={'빵집명'} name={'name'} value={name} onChangeForm={onChangeForm} />
      <SearchField
        label={'빵집개척자'}
        name={'pioneerNickName'}
        value={pioneerNickName || ''}
        disabled={isEdit && Boolean(pioneerNickName)}
        placeholder={'빵집개척자를 선택해주세요'}
        onClickSearch={openModal}
      />
      <BakeryImgField label={'대표이미지'} onChangeForm={onChangeForm} />
      <AddressArea label={'주소'} onChangeForm={onChangeForm} />
      <TextField textarea label={'시간'} name={'hours'} value={hours || ''} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} onChangeForm={onChangeForm} />
      <TextField
        textarea
        label={'갓군빵\n나오는 시간'}
        placeholder={'따끈따끈한 빵이 나오는 시간을 작성해주세요.\n[예시] 오전 8시 ~ 오전 9시 치아바타'}
        name={'newBreadTime'}
        value={newBreadTime || ''}
        onChangeForm={onChangeForm}
        multiline={true}
        multilineRowCount={6}
        alignTop={true}
      />
      <SnsLinkArea label={'홈페이지'} />
      <TextField label={'전화번호'} name={'phoneNumber'} value={phoneNumber || ''} placeholder={'000-000-0000'} onChangeForm={onChangeForm} />
      <TextField
        textarea
        label={'체크포인트'}
        placeholder={'이 빵집 또는 빵의 매력(장점) 대해서 작성 해주세요.\n빵을 맛있게 먹는 꿀팁도 좋아요'}
        name={'checkPoint'}
        value={checkPoint || ''}
        onChangeForm={onChangeForm}
        multiline={true}
        multilineRowCount={6}
        alignTop={true}
      />
      <FacilityField label={'시설정보'} />
      <MenuArea label={'메뉴'} />
    </Container>
  );
};

const Container = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;
`;
