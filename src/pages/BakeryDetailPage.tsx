import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BakerySns } from '@/apis';
import { useBakery } from '@/apis/bakery/useBakery';
import { BakeryForm } from '@/components/BakeryDetail/Form';
import { SnsLink } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { ReportTab } from '@/components/BakeryDetail/Report';
import { Button, SelectBox, StatusSelectTrigger, StatusSelectOption, SelectOption } from '@/components/Shared';
import { BAKERY_REPORT_TAB, BAKERY_STATUS_OPTIONS } from '@/constants';
import useSelectBox from '@/hooks/useSelectBox';
import useTab from '@/hooks/useTab';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initializeForm, setForm, setLinks, changeBakeryStatus, changeBakeryImg } from '@/store/slices/bakery';
import { makeBakeryPayload } from '@/utils';
import styled from '@emotion/styled';

export const BakeryDetailPage = () => {
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

  const { isOpen, selectedOption, onToggleSelectBox, onSelectOption } = useSelectBox(BAKERY_STATUS_OPTIONS[0]);
  const { tabs: reportTabs, selectTab: selectReportTab } = useTab({ tabData: BAKERY_REPORT_TAB });

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

  const onSelectBakerysSatusOption = (status: SelectOption | null) => {
    if (!status) {
      return;
    }
    onSelectOption(status);
    dispatch(changeBakeryStatus({ status: status.value }));
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
      <Header>
        <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} onClickBtn={onClickBack} />
        <SelectBox width={120} isOpen={isOpen} onToggleSelectBox={onToggleSelectBox} triggerComponent={<StatusSelectTrigger selectedOption={selectedOption} />}>
          {BAKERY_STATUS_OPTIONS.map((option, idx) => (
            <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectBakerysSatusOption} />
          ))}
        </SelectBox>
      </Header>
      <ScrollViewContainer>
        <ScrollSection>
          <BakeryForm />
        </ScrollSection>
        <ScrollSection>
          <div>
            <ReportTab tabs={reportTabs} handleSelectReportTab={selectReportTab} />
          </div>
        </ScrollSection>
      </ScrollViewContainer>
      <BtnSection>
        <div className="btn_wrapper">
          <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
          <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
        </div>
      </BtnSection>
    </Container>
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
