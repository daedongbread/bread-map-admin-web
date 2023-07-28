import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BakerySns } from '@/apis';
import { useBakery } from '@/apis/bakery/useBakery';
import { BakeryForm } from '@/components/BakeryDetail/Form';
import { SnsLink } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { ReportView } from '@/components/BakeryDetail/Report';
import { ReportModal } from '@/components/BakeryDetail/ReportModal';
import { FeedForm } from '@/components/HomeFeedDetail';
import { Button, SelectBox, SelectOption, StatusSelectOption, StatusSelectTrigger } from '@/components/Shared';
import { ModalPortal } from '@/components/Shared/Modal';
import { BAKERY_REPORT_TAB, BAKERY_STATUS_OPTIONS } from '@/constants';
import useModal from '@/hooks/useModal';
import useSelectBox from '@/hooks/useSelectBox';
import useTab from '@/hooks/useTab';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  BakeryForm as BakeryFormType,
  changeBakeryImg,
  changeBakeryStatus,
  changeForm,
  initializeForm,
  ProductItem,
  setForm,
  setLinks,
} from '@/store/slices/bakery';
import { urlToFile } from '@/utils';
import { validateForm } from '@/utils/bakery';
import styled from '@emotion/styled';

export const FeedDetailPage = () => {
  const { bakeryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    bakeryQuery: { data: bakery },
    addBakery,
    editBakery,
    bakeryReportNewStatusQuery: { data: bakeryReportNewStatus },
    uploadImage,
  } = useBakery({ bakeryId: Number(bakeryId) });

  const { form } = useAppSelector(selector => selector.bakery);

  const { isOpen, selectedOption, onToggleSelectBox, onCloseSelectBox, onSelectOption } = useSelectBox(BAKERY_STATUS_OPTIONS[0]);
  const { tabs: reportTabs, selectTab: selectReportTab, setUpdateStatusTab: setUpdateStatusReportTab } = useTab({ tabData: BAKERY_REPORT_TAB });
  const { addToast } = useToast();
  const { modalOn, openModal, closeModal } = useModal();

  useEffect(() => {
    if (bakery) {
      dispatch(
        setForm({
          form: {
            ...bakery,
            latitude: String(bakery.latitude),
            longitude: String(bakery.longitude),
          },
        })
      );
      updateLinksAtForm();
      onSelectOption(BAKERY_STATUS_OPTIONS.find(option => option.value === bakery.status) || null);
      if (bakery.image) {
        dispatch(changeBakeryImg({ imgPreview: bakery.image }));
      }
    } else {
      dispatch(initializeForm());
    }
  }, [bakery]);

  useEffect(() => {
    if (location.state) {
      Object.keys(location.state).forEach(key => {
        dispatch(changeForm({ name: key, value: location.state[key] }));
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (!bakeryReportNewStatus) {
      return;
    }

    setUpdateStatusReportTab(bakeryReportNewStatus);
  }, [bakeryReportNewStatus]);

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

  const createAndGetImageUrl = async (previewUrl: string) => {
    // ImageEditView와 동일한 로직, TODO: 나중에 공통으로 빼기?
    const imageUrl = previewUrl;
    if (!imageUrl) {
      return;
    }

    const formData = new FormData();
    const file = await urlToFile(imageUrl, 'bread.jpg');
    formData.append('image', file);
    const result = await uploadImage.mutateAsync({ payload: formData });
    return result.imagePath;
  };

  const uploadAllImages = async () => {
    let image = '';
    let products: ProductItem[] = [];

    if (form.image) {
      const result = await createAndGetImageUrl(form.image);
      result ? (image = result) : window.alert('이미지 반영을 실패했습니다. 다시 시도해주세요.');
    }

    if (form.productList.length > 0) {
      products = await Promise.all(
        form.productList.map(async bread => {
          if (bread.image) {
            const result = await createAndGetImageUrl(bread.image);
            return { ...bread, image: result ? result : null }; // TODO: 이미지 실패시 어떻게 처리?
          } else return bread;
        })
      );
    }

    return { image, products };
  };

  const onSaveForm = async () => {
    if (!window.confirm('저장하시겠습니까?')) {
      return;
    }
    if (!validateForm(form)) {
      return;
    }
    const { pioneerId, pioneerNickName, ...restForm } = form;

    if (bakeryId) {
      onUpdateForm({ ...restForm });
    } else {
      // 새로 생성하는 경우, 이미지를 새로 업로드한 경우는 이미지 업로드 과정 진행
      const { image, products } = await uploadAllImages();

      onCreateForm({ ...restForm, image, productList: products });
    }
  };

  const onSelectBakerysSatusOption = (status: SelectOption | null) => {
    if (!status) {
      return;
    }
    onSelectOption(status);
    dispatch(changeBakeryStatus({ status: status.value }));
  };

  const onCreateForm = (payload: Omit<BakeryFormType, 'pioneerId' | 'pioneerNickName'>) => {
    addBakery.mutate(
      { payload },
      {
        onSuccess: data => {
          addToast('빵집 등록을 완료했습니다.', 'error', 3000);
          setTimeout(() => {
            navigate(`/bakeries/${data.bakeryId}`);
          }, 1300);
        },
      }
    );
  };

  const onUpdateForm = (payload: Omit<BakeryFormType, 'pioneerId' | 'pioneerNickName'>) => {
    editBakery.mutate(
      { bakeryId: Number(bakeryId), payload },
      {
        onSuccess: () => {
          addToast('빵집 수정을 완료했습니다.', 'error', 3000);
        },
      }
    );
  };

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} onClickBtn={onClickBack} />
          <SelectBox
            width={120}
            isOpen={isOpen}
            onCloseSelectBox={onCloseSelectBox}
            onToggleSelectBox={onToggleSelectBox}
            triggerComponent={<StatusSelectTrigger selectedOption={selectedOption} />}
          >
            {/* TODO: STATUS 명칭 수정 */}
            {BAKERY_STATUS_OPTIONS.map((option, idx) => (
              <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectBakerysSatusOption} />
            ))}
          </SelectBox>
        </Header>

        <ScrollSection>
          <FeedForm isEdit={Boolean(bakery)} openModal={openModal} closeModal={closeModal} />
        </ScrollSection>

        <BtnSection>
          <div className="btn_wrapper">
            <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
            <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
          </div>
        </BtnSection>
      </Container>
      {modalOn && (
        <ModalPortal title={'제보 목록'} closeModal={closeModal}>
          <ReportModal closeModal={closeModal} />
        </ModalPortal>
      )}
    </>
  );
};

const BtnSection = styled.div`
  gap: 10px;
  height: 8rem;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 2;

  .btn_wrapper {
    display: flex;
    position: absolute;
    right: 22rem;
    top: 50%;
    transform: translateY(-50%);
    gap: 10px;
  }

  > button {
    width: 18rem;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  padding: 2rem 6rem;
  display: flex;

  &:first-of-type {
    gap: 50rem;
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
  padding: 2rem 4rem;

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
