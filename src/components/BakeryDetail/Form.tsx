import React from 'react';
import { BakeryDetailEntity } from '@/apis';
import { Button } from '@/components/Shared';
import { BakeryForm, BakeryFormChangeKey } from '@/store/slices/bakery';
import styled from '@emotion/styled';
import { AddressArea } from './AddressArea';
import { BakeryImgField } from './BakeryImgField';
import { Link, LinkArea } from './LinkArea';
import { MenuArea } from './MenuArea';
import { TextField } from './TextField';

type Props = {
  origin?: BakeryDetailEntity;
  form: BakeryForm;
  links: Link[];
  openedLinkIdx: number | null;
  openedMenuTypeIdx: number | null;
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: never }) => void;
  onChangeBakeryImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleLinkOption: (currIdx: number) => void;
  onSelectLinkOption: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onChangeLinkValue: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onSetLinks: (links: { key: string; value: string }[]) => void;
  onRemoveLink: (currIdx: number) => void;
  onAddLink: () => void;
  onToggleMenuTypeOption: (currIdx: number) => void;
  onSelectMenuTypeOption: (payload: { currIdx: number; optionValue: string }) => void;
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onAddMenu: () => void;
  onChangeMenuImg: ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => void;
  onSaveForm: () => void;
};

export const Form = ({
  form,
  links,
  openedLinkIdx,
  openedMenuTypeIdx,
  onChangeForm,
  onChangeBakeryImg,
  onToggleLinkOption,
  onSelectLinkOption,
  onChangeLinkValue,
  onSetLinks,
  onRemoveLink,
  onAddLink,
  onToggleMenuTypeOption,
  onSelectMenuTypeOption,
  onChangeMenuInput,
  onRemoveMenu,
  onAddMenu,
  onChangeMenuImg,
  onSaveForm,
}: Props) => {
  const { name, image, address, latitude, longitude, hours, phoneNumber, productList } = form;

  return (
    <>
      <Forms>
        <div>
          <TextField label={'빵집명'} name={'name'} value={name} onChangeForm={onChangeForm} />
          <BakeryImgField label={'대표이미지'} previewImg={image} onChangeBakeryImg={onChangeBakeryImg} />
          <AddressArea label={'주소'} fullAddress={{ address, latitude, longitude }} onChangeForm={onChangeForm} />
          <TextField
            textarea
            label={'시간'}
            name={'hours'}
            value={hours || ''}
            onChangeForm={onChangeForm}
            placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'}
          />
          <LinkArea
            label={'홈페이지'}
            links={links}
            openedLinkIdx={openedLinkIdx}
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
        </div>
      </Forms>
      <SaveBtns>
        <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
        <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
      </SaveBtns>
    </>
  );
};

const Forms = styled.form`
  flex: 1;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  padding: 2rem 6rem;
  margin-bottom: 10rem;
`;

const SaveBtns = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  width: ${({ theme }) => `calc(100% - ${theme.size.sidebarWidth})`};
  background-color: ${({ theme }) => theme.color.white};
  z-index: 2;
  > button {
    width: 18rem;
  }
`;
