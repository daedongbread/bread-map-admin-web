import React, { useCallback } from 'react';
import { AddressArea } from '@/components/BakeryDetail/Form/AddressArea';
import { BakeryImgField } from '@/components/BakeryDetail/Form/BakeryImgField';
import { FacilityField } from '@/components/BakeryDetail/Form/FacilityField';
import { MenuArea } from '@/components/BakeryDetail/Form/MenuArea';
import { SnsLinkArea } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm } from '@/store/slices/bakery';
import styled from '@emotion/styled';

export const BakeryForm = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(selector => selector.bakery);
  const { name, hours, phoneNumber } = form;

  const onChangeForm = useCallback((payload: { name: string; value: string }) => {
    dispatch(changeForm(payload));
  }, []);

  return (
    <Forms>
      <TextField label={'빵집명'} name={'name'} value={name} onChangeForm={onChangeForm} />
      <BakeryImgField label={'대표이미지'} onChangeForm={onChangeForm} />
      <AddressArea label={'주소'} />
      <TextField textarea label={'시간'} name={'hours'} value={hours || ''} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} onChangeForm={onChangeForm} />
      <SnsLinkArea label={'홈페이지'} />
      <TextField label={'전화번호'} name={'phoneNumber'} value={phoneNumber || ''} placeholder={'000-000-0000'} onChangeForm={onChangeForm} />
      <FacilityField label={'시설정보'} />
      <MenuArea label={'메뉴'} />
    </Forms>
  );
};

const Forms = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;
`;
