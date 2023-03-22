import React, { ChangeEvent, useCallback } from 'react';
import { AddressArea } from '@/components/BakeryDetail/Form/AddressArea';
import { BakeryImgField } from '@/components/BakeryDetail/Form/BakeryImgField';
import { MenuArea } from '@/components/BakeryDetail/Form/MenuArea';
import { SnsLink, SnsLinkArea } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { SelectOption } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addLink,
  addMenu,
  BakeryFormChangeKey,
  changeBakeryImg,
  changeBakeryStatus,
  changeForm,
  changeLinkValue,
  changeMenuImg,
  changeMenuInput,
  removeLink,
  removeMenu,
  selectLinkOption,
  selectMenuTypeOption,
  setLinks,
  toggleLinkOption,
  toggleMenuTypeOption,
} from '@/store/slices/bakery';
import styled from '@emotion/styled';

export const BakeryForm = () => {
  const dispatch = useAppDispatch();

  const { form, formLinks, openedSnsLinkIdx, openedMenuTypeIdx } = useAppSelector(selector => selector.bakery);
  const { name, image, address, latitude, longitude, hours, phoneNumber, productList } = form;

  const onChangeForm = useCallback((payload: { name: BakeryFormChangeKey; value: never }) => {
    dispatch(changeForm(payload));
  }, []);

  const onChangeBakeryImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    dispatch(changeBakeryImg({ imgPreview }));
  };

  const onToggleLinkOption = useCallback((currIdx: number) => {
    dispatch(toggleLinkOption({ currIdx }));
  }, []);

  const onSelectLinkOption = useCallback((payload: { currIdx: number; optionValue: string; linkValue: string }) => {
    dispatch(selectLinkOption(payload));
  }, []);

  const onChangeLinkValue = useCallback((payload: { currIdx: number; optionValue: string; linkValue: string }) => {
    dispatch(changeLinkValue(payload));
  }, []);

  const onSetLinks = useCallback((links: SnsLink[]) => {
    dispatch(setLinks({ links }));
  }, []);

  const onRemoveLink = useCallback((currIdx: number) => {
    dispatch(removeLink({ currIdx }));
  }, []);

  const onAddLink = useCallback(() => {
    dispatch(addLink());
  }, []);

  const onToggleMenuTypeOption = (currIdx: number) => {
    dispatch(toggleMenuTypeOption({ currIdx }));
  };

  const onSelectMenuTypeOption = ({ currIdx, optionValue }: { currIdx: number; optionValue: string }) => {
    dispatch(selectMenuTypeOption({ currIdx, optionValue }));
  };

  const onChangeMenuInput = (payload: { currIdx: number; name: string; value: string }) => {
    dispatch(changeMenuInput(payload));
  };

  const onRemoveMenu = (currIdx: number) => {
    dispatch(removeMenu({ currIdx }));
  };

  const onAddMenu = () => {
    dispatch(addMenu());
  };

  const onChangeMenuImg = ({ currIdx, e }: { currIdx: number; e: ChangeEvent<HTMLInputElement> }) => {
    if (!e.target.files) return;

    const imgPreview = URL.createObjectURL(e.target.files[0]);
    dispatch(changeMenuImg({ currIdx, imgPreview }));
  };

  return (
    <Forms>
      <TextField label={'빵집명'} name={'name'} value={name} onChangeForm={onChangeForm} />
      <BakeryImgField label={'대표이미지'} previewImg={image} onChangeBakeryImg={onChangeBakeryImg} />
      <AddressArea label={'주소'} fullAddress={{ address, latitude, longitude }} onChangeForm={onChangeForm} />
      <TextField textarea label={'시간'} name={'hours'} value={hours || ''} onChangeForm={onChangeForm} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} />
      <SnsLinkArea
        label={'홈페이지'}
        snsLinks={formLinks}
        openedLinkIdx={openedSnsLinkIdx}
        onToggleLinkOption={onToggleLinkOption}
        onSelectLinkOption={onSelectLinkOption}
        onChangeLinkValue={onChangeLinkValue}
        onSetLinks={onSetLinks}
        onRemoveLink={onRemoveLink}
        onAddLink={onAddLink}
      />
      <TextField label={'전화번호'} name={'phoneNumber'} value={phoneNumber || ''} onChangeForm={onChangeForm} placeholder={'000-000-0000'} />
      <MenuArea
        label={'메뉴'}
        menus={productList}
        openedMenuTypeIdx={openedMenuTypeIdx}
        onToggleMenuTypeOption={onToggleMenuTypeOption}
        onSelectMenuTypeOption={onSelectMenuTypeOption}
        onChangeMenuInput={onChangeMenuInput}
        onRemoveMenu={onRemoveMenu}
        onAddMenu={onAddMenu}
        onChangeMenuImg={onChangeMenuImg}
      />
    </Forms>
  );
};

const Forms = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;
`;
