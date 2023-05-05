import React from 'react';
import { Button } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addMenu,
  changeCurrentImageUploader,
  changeMenuInput,
  ImageUploaderInfo,
  removeMenu,
  selectMenuTypeOption,
  toggleMenuTypeOption,
} from '@/store/slices/bakery';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import MenuItem from './MenuItem';
import { Option } from './SnsLinkArea';

type Props = {
  label: string;
};

export const MenuArea = ({ label }: Props) => {
  const dispatch = useAppDispatch();
  const {
    form: { productList },
    openedMenuTypeIdx,
  } = useAppSelector(selector => selector.bakery);

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

  const onChangeMenuImg = ({ currIdx }: { currIdx: number }) => {
    const target = productList.find((p, idx) => idx === currIdx);
    const bakeryImage: ImageUploaderInfo = {
      url: target?.image || '',
      type: 'menu',
      name: target?.productName || '메뉴명 없음',
      // menuId: , 필요없는듯?
      currMenuIdx: currIdx,
    };
    dispatch(changeCurrentImageUploader(bakeryImage));
  };

  return (
    <Row alignTop>
      <label>{label}</label>
      <RowContents>
        {productList?.map((item, idx) => (
          <MenuItem
            key={`menu-${idx}`}
            idx={idx}
            menu={item}
            productTypes={MENU_TYPES}
            isOpenMenuType={openedMenuTypeIdx === idx}
            onToggleMenuTypeOption={onToggleMenuTypeOption}
            onSelectMenuTypeOption={onSelectMenuTypeOption}
            onChangeMenuInput={onChangeMenuInput}
            onRemoveMenu={onRemoveMenu}
            onChangeMenuImg={onChangeMenuImg}
          />
        ))}
        <BtnWrapper>
          <Button type={'lightOrange'} text={'추가하기'} btnSize={'small'} onClickBtn={onAddMenu} />
        </BtnWrapper>
      </RowContents>
    </Row>
  );
};

const MENU_TYPES: Option[] = [
  { name: '빵', value: 'BREAD' },
  { name: '음료', value: 'BEVERAGE' },
  { name: '기타', value: 'ETC' },
];

const BtnWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
`;
