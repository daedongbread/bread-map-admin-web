import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BakerySns } from '@/apis';
import { useBakery } from '@/apis/bakery/useBakery';
import { AddressArea, BakeryImgField, MenuArea, SnsLink, SnsLinkArea, TextField } from '@/components/BakeryDetail/Form';
import { Button, SelectBox, StatusSelectTrigger, StatusSelectOption, SelectOption } from '@/components/Shared';
import { BAKERY_STATUS_OPTIONS } from '@/constants';
import useSelectBox from '@/hooks/useSelectBox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  initializeForm,
  setForm,
  setLinks,
  changeForm,
  changeBakeryStatus,
  BakeryFormChangeKey,
  changeBakeryImg,
  toggleLinkOption,
  selectLinkOption,
  changeLinkValue,
  removeLink,
  addLink,
  changeMenuInput,
  removeMenu,
  addMenu,
  changeMenuImg,
  toggleMenuTypeOption,
  selectMenuTypeOption,
} from '@/store/slices/bakery';
import { makeBakeryPayload } from '@/utils';
import styled from '@emotion/styled';

export const BakeryDetailContainer = () => {
  const { bakeryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    bakeryQuery: { data: bakery },
    addBakery,
    editBakery,
  } = useBakery({ bakeryId: Number(bakeryId) });

  // opened state를 리덕스에 저장하면 안될거같은데..?
  const { form, formLinks, openedSnsLinkIdx, openedMenuTypeIdx } = useAppSelector(selector => selector.bakery);
  const { name, image, address, latitude, longitude, hours, phoneNumber, productList } = form;

  const { isOpen, selectedOption, onToggleSelectBox, onSelectOption } = useSelectBox(BAKERY_STATUS_OPTIONS[0]);

  useEffect(() => {
    if (bakery) {
      dispatch(setForm({ form: bakery })); // image(bakery img 제거하기)
      updateLinksAtForm();
      onSelectOption(BAKERY_STATUS_OPTIONS.find(option => option.value === bakery.status) || null);
      if (bakery.image) {
        dispatch(changeBakeryImg({ imgPreview: bakery.image }));
      }
    } else {
      dispatch(initializeForm());
    }
  }, [bakery]);

  const updateLinksAtForm = () => {
    const links: SnsLink[] = [];
    if (bakery) {
      for (const [key, value] of Object.entries(bakery)) {
        if (key.includes('URL')) {
          links.push({ key: key as BakerySns, value: value as string });
        }
      }
      dispatch(setLinks({ links }));
    }
  };

  const onSaveForm = async () => {
    if (!window.confirm('저장하시겠습니까?')) {
      return;
    }
    const payload = await makeBakeryPayload({ origin: bakery, form, formLinks });
    bakeryId ? onUpdateForm(payload) : onCreateForm(payload);
  };

  const onChangeForm = useCallback((payload: { name: BakeryFormChangeKey; value: never }) => {
    dispatch(changeForm(payload));
  }, []);

  const onSelectBakerysSatusOption = (status: SelectOption | null) => {
    if (!status) {
      return;
    }
    onSelectOption(status);
    dispatch(changeBakeryStatus({ status: status.value }));
  };

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

  const onCreateForm = (payload: FormData) => {
    addBakery.mutate(
      { payload },
      {
        onSuccess: () => {
          navigate(-1); // TODO: 완료됨 UI 필요
        },
      }
    );
  };

  const onUpdateForm = (payload: FormData) => {
    editBakery.mutate(
      { bakeryId: Number(bakeryId), payload },
      {
        onSuccess: () => {
          navigate(-1); // TODO: 완료됨 UI 필요
        },
      }
    );
  };

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <Container>
      <div>
        <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} onClickBtn={onClickBack} />
        <SelectBox width={120} isOpen={isOpen} onToggleSelectBox={onToggleSelectBox} triggerComponent={<StatusSelectTrigger selectedOption={selectedOption} />}>
          {BAKERY_STATUS_OPTIONS.map((option, idx) => (
            <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectBakerysSatusOption} />
          ))}
        </SelectBox>
      </div>
      <ScrollViewContainer>
        <ScrollSection>
          <Forms>
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
        </ScrollSection>
        <ScrollSection>
          <Edit>정보수정</Edit>
        </ScrollSection>
        <SaveBtns>
          <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
          <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
        </SaveBtns>
      </ScrollViewContainer>
    </Container>
  );
};

const Forms = styled.form`
  padding-right: 6rem;
  margin-bottom: 10rem;
`;

const SaveBtns = styled.div`
  display: flex;
  gap: 10px;
  padding: 2rem 0 2rem 40rem;
  position: fixed;
  left: 30rem;
  bottom: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 2;
  > button {
    width: 18rem;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > div {
    border-bottom: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    padding: 2rem 6rem;
    display: flex;

    &:first-of-type {
      gap: 50rem;
    }
  }
`;

const ScrollViewContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
`;

const ScrollSection = styled.div`
  overflow: scroll;
  min-height: 80rem;
  height: 100%;
  min-width: 80rem;
  width: 100%;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray200};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const Edit = styled.div`
  padding-left: 6rem;
  min-height: 100vh;
  height: 500px;
`;
