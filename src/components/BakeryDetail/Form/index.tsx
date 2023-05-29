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
  openModal: () => void;
  closeModal: () => void;
};

export const BakeryForm = ({ openModal }: Props) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(selector => selector.bakery);
  const { name, pioneerNickName, hours, phoneNumber } = form; // TODO: 빵집 개척자 닉네임을 모르는 형태라, 어떻게할지 고민해야함.

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
        placeholder={'빵집개척자를 선택해주세요'}
        onClickSearch={openModal}
      />
      <BakeryImgField label={'대표이미지'} onChangeForm={onChangeForm} />
      <AddressArea label={'주소'} onChangeForm={onChangeForm} />
      <TextField textarea label={'시간'} name={'hours'} value={hours || ''} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} onChangeForm={onChangeForm} />
      <SnsLinkArea label={'홈페이지'} />
      <TextField label={'전화번호'} name={'phoneNumber'} value={phoneNumber || ''} placeholder={'000-000-0000'} onChangeForm={onChangeForm} />
      <FacilityField label={'시설정보'} />
      <MenuArea label={'메뉴'} />
    </Container>
  );
};

const Container = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;
`;
