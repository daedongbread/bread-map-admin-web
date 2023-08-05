import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateUpdateCurationFeedPayload, CurationBakeryEntity, CurationFeedDetailEntity, useHomeFeed } from '@/apis';
import { useBakery } from '@/apis/bakery/useBakery';
import { FeedForm } from '@/components/HomeFeedDetail';
import { BakeryMenuModal } from '@/components/HomeFeedDetail/BakeryMenuModal';
import { BakeryModal } from '@/components/HomeFeedDetail/BakeryModal';
import { Button, SelectBox, SelectOption, StatusSelectOption, StatusSelectTrigger } from '@/components/Shared';
import { ModalPortal } from '@/components/Shared/Modal';
import useModal from '@/hooks/useModal';
import useSelectBox from '@/hooks/useSelectBox';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import bakery from '@/store/slices/bakery';
import { changeHomeFeedStatus, HomeFeedStatus, setForm, initializeForm } from '@/store/slices/homeFeed';
import { urlToFile } from '@/utils';
import { validateHomeFeedForm } from '@/utils/bakery';
import { HOME_FEED_STATUS_OPTIONS } from '@/utils/homeFeed';
import styled from '@emotion/styled';

export const FeedDetailPage = () => {
  const { feedId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    homeFeedQuery: { data: homeFeed },
    addHomeFeed,
    editHomeFeed,
  } = useHomeFeed({ feedId: Number(feedId) });

  const { uploadImage } = useBakery({ bakeryId: Number(3) }); // TODO: 이미지 업로드 API 분리

  const { form } = useAppSelector(selector => selector.homeFeed);

  type ModalInfo = {
    type: 'bakery' | 'bread';
    index: number;
  };

  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);

  const onOpenModalByType = useCallback(({ type, index }: { type: 'bakery' | 'bread'; index: number }) => {
    setModalInfo({ type, index });
    openModal();
  }, []);

  const getModalTitle = useCallback(
    (type?: string) => {
      switch (type) {
        case 'bakery':
          return '빵집 조회';
        case 'bread':
          return '빵메뉴 조회';
        default:
          return '';
      }
    },
    [modalInfo]
  );

  const { isOpen, selectedOption, onToggleSelectBox, onCloseSelectBox, onSelectOption } = useSelectBox(HOME_FEED_STATUS_OPTIONS[0]);
  const { addToast } = useToast();
  const { modalOn, openModal, closeModal } = useModal();

  useEffect(() => {
    if (homeFeed) {
      dispatch(
        setForm({
          form: homeFeed,
        })
      );

      console.log('HOME_FEED_STATUS_OPTIONS', HOME_FEED_STATUS_OPTIONS);
      console.log('homeFeed.common.activeTime', homeFeed.common.activated);
      onSelectOption(HOME_FEED_STATUS_OPTIONS.find(option => option.value === homeFeed.common.activated) || null);
      if (homeFeed.common?.thumbnailUrl) {
        // TODO: 이미지 갱신
        // dispatch(changeBakeryImg({ imgPreview: bakery.image }));
      }
    } else {
      dispatch(initializeForm());
    }
  }, [homeFeed]);

  // ??
  // useEffect(() => {
  //   if (location.state) {
  //     Object.keys(location.state).forEach(key => {
  //       dispatch(changeForm({ name: key, value: location.state[key] }));
  //     });
  //   }
  // }, [location.state]);

  const createAndGetImageUrl = async (previewUrl: string) => {
    // ImageEditView와 동일한 로직, TODO: 나중에 공통으로 빼기?
    const imageUrl = previewUrl;
    if (!imageUrl) {
      return;
    }

    const formData = new FormData();
    const file = await urlToFile(imageUrl, 'bakery-menu.jpg');
    formData.append('image', file);
    const result = await uploadImage.mutateAsync({ payload: formData });
    return result.imagePath;
  };

  const uploadAllImages = async () => {
    let thumbnailUrl = '';

    if (form.thumbnailUrl) {
      const result = await createAndGetImageUrl(form.thumbnailUrl);
      console.log('이미지result', result);
      result ? (thumbnailUrl = result) : window.alert('이미지 반영을 실패했습니다. 다시 시도해주세요.');
    }

    return { thumbnailUrl };
  };

  const onSaveForm = async () => {
    if (!window.confirm('큐레이션을 저장하시겠습니까?')) {
      return;
    }
    if (!validateHomeFeedForm(form)) {
      return;
    }
    const { subTitle, introduction, conclusion, curations, activeTime, thumbnailUrl, likeCounts, activated } = form;
    const payload: CurationFeedDetailEntity = {
      common: {
        subTitle,
        introduction,
        conclusion,
        thumbnailUrl,
        activated,
        feedType: 'CURATION',
        categoryId: 1,
        activeTime: `${form.uploadDate}T${form.uploadTime}`,
      },
      curation: curations.map(c => ({ bakeryId: c.bakery.bakeryId, productId: c.bread.productId, reason: c.reason } as CurationBakeryEntity)),
      landing: null,
    };

    console.log('등록...! feedId', feedId);
    // feedId가 있으면(숫자)면 수정, 없으면 생성
    if (feedId !== 'add') {
      console.log('if문 탐', typeof Number(feedId));
      // 이미지가 있었으나 새로 추가한경우 이미지 업로드 과정 진행
      if (homeFeed?.common.thumbnailUrl && homeFeed?.common.thumbnailUrl !== form.thumbnailUrl) {
        const { thumbnailUrl } = await uploadAllImages();
        onUpdateForm({ payload: { ...payload, common: { ...payload.common, thumbnailUrl } } });
      } else {
        onUpdateForm({ payload });
      }
      // if (bakery.image && bakery.image !== form.image) {
      //   const { image } = await uploadAllImages();
      //   onUpdateForm({ payload: { ...payload, image } });
    } else {
      console.log('else문 탐', typeof Number(feedId));
      // 새로 생성하는 경우, 이미지를 새로 업로드한 경우는 이미지 업로드 과정 진행
      if (form.thumbnailUrl) {
        const { thumbnailUrl } = await uploadAllImages();
        onCreateForm({ payload: { ...payload, common: { ...payload.common, thumbnailUrl } } });
      } else {
        onCreateForm({ payload });
      }
    }
  };

  const onCreateForm = (payload: CreateUpdateCurationFeedPayload) => {
    addHomeFeed.mutate(
      { ...payload },
      {
        onSuccess: data => {
          addToast('컨텐츠 등록을 완료했습니다.', 'error', 3000);
          setTimeout(() => {
            // TODO: 상세페이지로 이동
            // navigate(`/bakeries/${data.bakeryId}`);
          }, 1300);
        },
      }
    );
  };

  const onUpdateForm = (payload: CreateUpdateCurationFeedPayload) => {
    if (!feedId) return;
    editHomeFeed.mutate(
      { feedId: Number(feedId), ...payload },
      {
        onSuccess: () => {
          addToast('컨텐츠 수정을 완료했습니다.', 'error', 3000);
        },
      }
    );
  };

  const onSelectHomeFeedStatusOption = (status: SelectOption | null) => {
    if (!status) {
      return;
    }
    onSelectOption(status);
    dispatch(changeHomeFeedStatus({ activated: status.value as HomeFeedStatus }));
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
            {HOME_FEED_STATUS_OPTIONS.map((option, idx) => (
              <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectHomeFeedStatusOption} />
            ))}
          </SelectBox>
        </Header>

        <ScrollSection>
          <FeedForm isEdit={Boolean(bakery)} openModal={openModal} closeModal={closeModal} onOpenModalByType={onOpenModalByType} />
        </ScrollSection>

        <BtnSection>
          <div className="btn_wrapper">
            <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
            <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
          </div>
        </BtnSection>
      </Container>
      {modalOn && (
        <ModalPortal title={getModalTitle(modalInfo?.type)} closeModal={closeModal}>
          {modalInfo?.type === 'bakery' && <BakeryModal currIdx={modalInfo.index} closeModal={closeModal} />}
          {modalInfo?.type === 'bread' && <BakeryMenuModal currIdx={modalInfo.index} closeModal={closeModal} />}
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
