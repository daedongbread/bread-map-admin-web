import React, { useCallback } from 'react';
import { AddressArea } from '@/components/BakeryDetail/Form/AddressArea';
import { BakeryImgField } from '@/components/BakeryDetail/Form/BakeryImgField';
import { FacilityField } from '@/components/BakeryDetail/Form/FacilityField';
import { MenuArea } from '@/components/BakeryDetail/Form/MenuArea';
import { SearchField } from '@/components/BakeryDetail/Form/SearchField';
import { SnsLinkArea } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { CurationBakery } from '@/components/HomeFeedDetail/CurationBakery';
import { ReadOnlyInputField } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm } from '@/store/slices/bakery';
import styled from '@emotion/styled';

type Props = {
  isEdit: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const FeedForm = ({ isEdit, openModal }: Props) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(selector => selector.bakery);
  const { name, pioneerNickName, hours, phoneNumber } = form;

  const onChangeForm = useCallback((payload: { name: string; value: string }) => {
    dispatch(changeForm(payload));
  }, []);

  return (
    <Container>
      <TextField label={'카테고리'} name={'name'} value={name} onChangeForm={onChangeForm} />
      <TextField label={'작성자'} name={'name'} value={name} onChangeForm={onChangeForm} />
      <TextField textarea label={'제목'} name={'hours'} value={hours || ''} placeholder={'콘텐츠 제목을 입력해 주세요.'} onChangeForm={onChangeForm} />
      <TextField textarea label={'서론'} name={'hours'} value={hours || ''} placeholder={'인사말 문구를 작성해 주세요.'} onChangeForm={onChangeForm} />
      <TextField textarea label={'결론'} name={'hours'} value={hours || ''} placeholder={'끝맺음 문구를 작성해 주세요.'} onChangeForm={onChangeForm} />
      {/*<SearchField*/}
      {/*  label={'빵집개척자'}*/}
      {/*  name={'pioneerNickName'}*/}
      {/*  value={pioneerNickName || ''}*/}
      {/*  disabled={isEdit && Boolean(pioneerNickName)}*/}
      {/*  placeholder={'빵집개척자를 선택해주세요'}*/}
      {/*  onClickSearch={openModal}*/}
      {/*/>*/}
      <CurationBakery />
      <TextField textarea label={'게시일시'} name={'hours'} value={hours || ''} placeholder={'YYY.MM.DD'} onChangeForm={onChangeForm} />
      <TextField textarea label={'시간'} name={'hours'} value={hours || ''} placeholder={'YYY.MM.DD'} onChangeForm={onChangeForm} />
      <BakeryImgField label={'배너 이미지'} onChangeForm={onChangeForm} />
      <ReadOnlyInputField label={'좋아요 개수'} content={hours || ''} placeholder={'YYY.MM.DD'} />
      {/*<AddressArea label={'주소'} onChangeForm={onChangeForm} />*/}
      {/*<TextField textarea label={'시간'} name={'hours'} value={hours || ''} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} onChangeForm={onChangeForm} />*/}
      {/*<SnsLinkArea label={'홈페이지'} />*/}
      {/*<TextField label={'전화번호'} name={'phoneNumber'} value={phoneNumber || ''} placeholder={'000-000-0000'} onChangeForm={onChangeForm} />*/}
      {/*<FacilityField label={'시설정보'} />*/}
      {/*<MenuArea label={'메뉴'} />*/}
    </Container>
  );
};

const Container = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;
`;
