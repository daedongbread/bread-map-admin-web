import React, { ChangeEvent } from 'react';
import { Button } from '@/components/Shared';
import { ProductItem } from '@/store/slices/bakery';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import MenuItem from './MenuItem';
import { Option } from './SnsLinkArea';

type Props = {
  label: string;
  menus: ProductItem[];
  openedMenuTypeIdx: number | null;
  onToggleMenuTypeOption: (currIdx: number) => void;
  onSelectMenuTypeOption: (payload: { currIdx: number; optionValue: string }) => void;
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onAddMenu: () => void;
  onChangeMenuImg: ({ currIdx, e }: { currIdx: number; e: ChangeEvent<HTMLInputElement> }) => void;
};

export const MenuArea = ({
  label,
  menus,
  openedMenuTypeIdx,
  onToggleMenuTypeOption,
  onSelectMenuTypeOption,
  onChangeMenuInput,
  onRemoveMenu,
  onAddMenu,
  onChangeMenuImg,
}: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RowContents>
        {menus?.map((item, idx) => (
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
  { name: '야채', value: 'BEVERAGE' },
  { name: '기타', value: 'ETC' },
];

const BtnWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
`;
