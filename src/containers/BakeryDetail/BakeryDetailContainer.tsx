import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBakery } from '@/apis/bakery/useBakery';
import { Form } from '@/components/BakeryDetail';
import { Link } from '@/components/BakeryDetail/LinkForm';
import { Button, SelectBox, StatusSelectTrigger, StatusSelectOption, SelectOption } from '@/components/Shared';
import { BAKERY_STATUS_OPTIONS, PATH } from '@/constants';
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
import { urlToBlob } from '@/utils';
import styled from '@emotion/styled';

const emptyFile = new Blob([''], { type: 'image/png' });

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
  const { form, formLinks, openedLinkIdx, openedMenuTypeIdx } = useAppSelector(selector => selector.bakery);
  const { isOpen, selectedOption, onToggleSelectBox, onSelectOption } = useSelectBox(BAKERY_STATUS_OPTIONS[0]);

  React.useEffect(() => {
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
    const links: { key: string; value: string }[] = [];
    if (bakery) {
      for (const [key, value] of Object.entries(bakery)) {
        if (key.includes('URL')) {
          links.push({ key, value: value as string });
        }
      }
      dispatch(setLinks({ links }));
    }
  };

  const onSaveForm = async () => {
    if (!window.confirm('저장하시겠습니까?')) {
      return;
    }

    const formData = new FormData();

    // link에 대한 순회
    const linkPayload: { [key: string]: string } = {};
    formLinks.forEach(link => {
      linkPayload[link.key] = link.value;
    });

    // make request data
    const copiedForm = { ...form };
    const { image, productList, ...requestData } = copiedForm;
    const productListExceptImage = productList.map(item => {
      const { image, ...rest } = item;
      return { ...rest };
    });
    const request = new Blob([JSON.stringify({ ...requestData, productList: productListExceptImage, ...linkPayload })], { type: 'application/json' });
    formData.append('request', request);

    // make productList (image) data
    //이미지들은 원본데이터(original)와 달라졌을 경우만 아래로직들 실행하기.
    //메뉴들의 순서가 바뀔수있으므로, 순회해서 target을 찾는다.
    //빵 메뉴 이미지 순회,
    // 빵메뉴가 없으면 append X, 빵메뉴가 없을때 productImageList = [] 로 보내면 에러가 난다.

    if (form.productList.length) {
      if (bakery) {
        // 수정시
        // console.log('origin', origin);
        for (const bread of form.productList) {
          let file: File | Blob | string = '';
          const target = bakery.productList.find(item => item.productId === bread.productId);
          if (target) {
            if (bread.image === target.image) {
              file = target.image ? target.image : emptyFile;
            } else {
              file = bread.image ? await urlToBlob(bread.image as string, bread.productName) : emptyFile;
            }
          } else {
            file = bread.image ? await urlToBlob(bread.image as string, bread.productName) : emptyFile;
          }
          formData.append('productImageList', file);
        }
      } else {
        // 생성시
        for (const bread of form.productList) {
          const emptyBlob = new Blob([''], { type: 'image/png' });
          const blob: Blob = bread.image ? await urlToBlob(bread.image as string, bread.productName) : emptyBlob;
          formData.append('productImageList', blob);
        }
      }
    }
    // make bakeryImage data
    // 빵집 이미지없으면 append X
    if (form.image) {
      let file: Blob | string = '';
      if (bakery) {
        if (form.image === bakery.image) {
          // 기존 이미지를 바꾸지않았다면 그냥 string을 넣는다. 테스트 필요
          file = bakery.image;
        } else {
          file = await urlToBlob(form.image, form.name);
        }
      } else {
        file = await urlToBlob(form.image, form.name);
      }

      formData.append('bakeryImage', file);
    }

    const payload = await formData;
    for (const [key, value] of payload) {
      console.log(`${key}: ${value}`);
    }

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

  const onChangeBakeryImg = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSetLinks = useCallback((links: Link[]) => {
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

  const onChangeMenuImg = ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => {
    if (!e.target.files) return;

    const imgPreview = URL.createObjectURL(e.target.files[0]);
    dispatch(changeMenuImg({ currIdx, imgPreview }));
  };

  const onCreateForm = (payload: FormData) => {
    addBakery.mutate(
      { payload },
      {
        onSuccess: () => {
          navigate(PATH.Bakeries); // TODO: 완료됨 UI 필요
        },
      }
    );
  };

  const onUpdateForm = (payload: FormData) => {
    editBakery.mutate(
      { bakeryId: Number(bakeryId), payload },
      {
        onSuccess: () => {
          navigate(PATH.Bakeries); // TODO: 완료됨 UI 필요
        },
      }
    );
  };

  const onClickBack = useCallback(() => {
    navigate(PATH.Bakeries);
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
      <Form
        origin={bakery}
        form={form}
        links={formLinks}
        openedLinkIdx={openedLinkIdx}
        openedMenuTypeIdx={openedMenuTypeIdx}
        onChangeForm={onChangeForm}
        onChangeBakeryImg={onChangeBakeryImg}
        onToggleLinkOption={onToggleLinkOption}
        onSelectLinkOption={onSelectLinkOption}
        onChangeLinkValue={onChangeLinkValue}
        onSetLinks={onSetLinks}
        onRemoveLink={onRemoveLink}
        onAddLink={onAddLink}
        onToggleMenuTypeOption={onToggleMenuTypeOption}
        onSelectMenuTypeOption={onSelectMenuTypeOption}
        onChangeMenuInput={onChangeMenuInput}
        onRemoveMenu={onRemoveMenu}
        onAddMenu={onAddMenu}
        onChangeMenuImg={onChangeMenuImg}
        onSaveForm={onSaveForm}
      />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > div {
    padding: 2rem 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
