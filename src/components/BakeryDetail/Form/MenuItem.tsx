import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import type { BakeryMenuEntity } from '@/apis';
import { BasicSelectOption, BasicSelectTrigger, Button, Input, Preview, SelectBox, SelectOption } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import useSelectBox from '@/hooks/useSelectBox';
import { useAppDispatch } from '@/store/hooks';
import { changeMenuImg } from '@/store/slices/bakery';
import { Row } from '@/styles';
import styled from '@emotion/styled';
import { Option } from './SnsLinkArea';

type Props = {
  idx: number;
  menu: Omit<BakeryMenuEntity, 'productId'> & { productId?: number };
  productTypes: Option[];
  isOpenMenuType: boolean;
  onCloseMenuTypeOption: () => void;
  onToggleMenuTypeOption: (currIdx: number) => void;
  onSelectMenuTypeOption: (payload: { currIdx: number; optionValue: string | number }) => void;
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onChangeMenuImg: ({ currIdx }: { currIdx: number }) => void;
};

const MenuItem = ({
  idx,
  menu,
  productTypes,
  isOpenMenuType,
  onCloseMenuTypeOption,
  onToggleMenuTypeOption,
  onSelectMenuTypeOption,
  onChangeMenuInput,
  onRemoveMenu,
  onChangeMenuImg,
}: Props) => {
  const dispatch = useAppDispatch();
  const { bakeryId } = useParams();
  const { inputRef, onClickTriggerFile, getSrc } = useFileInput();
  const { selectedOption, onSelectOption, onCloseSelectBox } = useSelectBox(productTypes.find(type => type.value === menu.productType));

  const onSelectMenuType = (option: SelectOption | null) => {
    if (!option) return;
    onSelectOption(option); // UI 업데이트
    onSelectMenuTypeOption({ currIdx: idx, optionValue: option?.value });
  };

  const onCloseMenuType = () => {
    onCloseSelectBox();
    onCloseMenuTypeOption();
  };

  // 생성시에는 이미지 로컬 등록, 수정시에는 Report 컴포넌트에서 수정되도록
  const handleClickBtn = () => {
    bakeryId ? onChangeMenuImgToUploader() : onClickTriggerFile();
  };

  const onChangeMenuImgToUploader = () => {
    onChangeMenuImg({ currIdx: idx });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    dispatch(changeMenuImg({ currIdx: idx, imgPreview: URL.createObjectURL(file) }));
  };

  return (
    <Container>
      <LeftContainer>
        <CustomRow>
          <label>메뉴명</label>
          <Input
            name={'productName'}
            value={menu.productName}
            type={'plain'}
            onChangeInput={e =>
              onChangeMenuInput({
                currIdx: idx,
                name: 'productName',
                value: e.target.value,
              })
            }
          />
        </CustomRow>
        <CustomRow>
          <label>가격</label>
          <Input
            name={'price'}
            value={menu.price.toLocaleString()}
            type={'plain'}
            onChangeInput={e => onChangeMenuInput({ currIdx: idx, name: 'price', value: e.target.value })}
          />
        </CustomRow>
        <CustomRow>
          <label>종류</label>
          <SelectBox
            isOpen={isOpenMenuType}
            onCloseSelectBox={onCloseMenuType}
            onToggleSelectBox={() => onToggleMenuTypeOption(idx)}
            triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} />}
          >
            {productTypes.map((type, idx) => (
              <BasicSelectOption key={idx} option={type} onSelectOption={onSelectMenuType || productTypes.find(type => type.value === menu.productType)} />
            ))}
          </SelectBox>
        </CustomRow>
        <BtnWrapper>
          <Button text={'메뉴 삭제'} type={'gray'} btnSize={'small'} onClickBtn={() => onRemoveMenu(idx)} />
          <Button text={'이미지 변경'} type={'lightOrange'} btnSize={'small'} onClickBtn={handleClickBtn} />
        </BtnWrapper>
      </LeftContainer>
      <div>
        <Preview widthRem={16} heightRem={16} src={getSrc(menu.image) || ''} emptyText={'메뉴 이미지가 없습니다.'} />
        <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={handleChangeImage} />
      </div>
    </Container>
  );
};

export default MenuItem;

const Container = styled.div`
  padding: 1rem 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 7rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;

  button:first-of-type {
    margin-right: 10px;
  }

  // height: 30px;
`;

const CustomRow = styled(Row)`
  > label {
    font-size: 1.35rem;
    font-weight: 500;
    margin-left: 2rem;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
