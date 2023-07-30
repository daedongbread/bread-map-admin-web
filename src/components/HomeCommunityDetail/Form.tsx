import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeCommunityEntity, useHomeCommunity } from '@/apis';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { MultiImageField } from '@/components/HomeCommunityDetail/MultiImageField';
import { SingleImageField } from '@/components/HomeCommunityDetail/SingleImageField';
import { Button, SelectBox, SelectOption, StatusSelectOption, StatusSelectTrigger } from '@/components/Shared';
import CheckSqure from '@/components/Shared/Icons/CheckSqure.svg';
import CheckSqureOrange from '@/components/Shared/Icons/CheckSqureOrange.svg';
import useSelectBox from '@/hooks/useSelectBox';
import { useToast } from '@/hooks/useToast';
import { COMMUNITY_POSTED_STATUS_OPTIONS } from '@/pages';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  communityId: number;
};

export const CommunityForm = ({ communityId }: Props) => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const onClickBack = useCallback(() => {
    navigate(-1);
  }, []);

  const {
    getHomeCommunityEvent: { data: communityData },
    createHomeCommunityEvent,
    updateHomeCommunityEvent,
  } = useHomeCommunity({ communityId });
  const [formData, setFormData] = useState<HomeCommunityEntity>({
    isPosted: false,
    isFixed: false,
    isCarousel: false,
    title: '',
    content: '',
    bannerImage: 'test',
    images: null,
  });
  const { isOpen, selectedOption, onToggleSelectBox, onCloseSelectBox, onSelectOption } = useSelectBox(COMMUNITY_POSTED_STATUS_OPTIONS[0]);
  const onSelectBakerysSatusOption = (status: SelectOption | null) => {
    if (!status) {
      return;
    }
    onSelectOption(status);
    setFormData({
      ...formData,
      isPosted: Boolean(status.value),
    });
  };

  useEffect(() => {
    if (!communityId || !communityData) {
      return;
    }
    setFormData({
      ...formData,
      ...communityData,
    });
    onSelectOption(COMMUNITY_POSTED_STATUS_OPTIONS.find(option => option.value === communityData.isPosted.toString()) || null);
  }, [communityData]);

  function handleChange(name: string, value: string | boolean) {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleCreate() {
    createHomeCommunityEvent.mutate(
      { ...formData },
      {
        onSuccess: data => {
          addToast('커뮤니티 이벤트 등록을 완료했습니다.', 'error', 3000);
        },
      }
    );
  }

  function handleUpdate() {
    updateHomeCommunityEvent.mutate(
      { ...formData },
      {
        onSuccess: () => {
          addToast('커뮤니티 이벤트 수정을 완료했습니다.', 'error', 3000);
        },
      }
    );
  }

  return (
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
          {COMMUNITY_POSTED_STATUS_OPTIONS.map((option, idx) => (
            <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectBakerysSatusOption} />
          ))}
        </SelectBox>
      </Header>
      <Row>
        <label>{'토픽'}</label>
        <RowContents>
          <TopicOption isActive={true}>
            <span>{'이벤트'}</span>
          </TopicOption>
        </RowContents>
      </Row>
      <div style={{ display: 'flex' }}>
        <CheckContainer>
          <input
            type="checkbox"
            id={'isFixed'}
            checked={formData.isFixed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.id, e.target.checked)}
          />
          <label htmlFor={'isFixed'}>{'상단 고정'}</label>
        </CheckContainer>
        <CheckContainer>
          <input
            type="checkbox"
            id={'isCarousel'}
            checked={formData.isCarousel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.id, e.target.checked)}
          />
          <label htmlFor={'isCarousel'}>{'캐러셀 노출'}</label>
        </CheckContainer>
      </div>
      {/*<TextField label={'작성 아이디'} name={'topic'} value={'value'} onChangeForm={() => {}} />*/}
      <TextField label={'제목'} name={'title'} value={formData.title} onChangeForm={e => handleChange(e.name, e.value)} />
      <TextField
        textarea
        label={'본문'}
        name={'content'}
        value={formData.content}
        placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'}
        onChangeForm={e => handleChange(e.name, e.value)}
      />
      <SingleImageField label={'배너 이미지'} imageUrl={formData.bannerImage} onChangeForm={() => {}} />
      <MultiImageField label={'이미지'} imageUrl={''} onChangeForm={() => {}} />
      <Row>
        <BtnWrapper>
          <Button type={'lightOrange'} text={'저장하기'} btnSize={'medium'} onClickBtn={communityId > 0 ? handleUpdate : handleCreate} />
        </BtnWrapper>
      </Row>
    </Container>
  );
};

const Container = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 6.4rem;
`;

const CheckContainer = styled.div<{ alignTop?: boolean }>`
  position: relative;
  display: flex;
  align-items: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};
  height: 25px;
  width: 100px;

  > label {
    width: 12rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  &:not(label) {
    flex: 1;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label:before {
    content: '';
    position: absolute;
    right: 22rem; // -2.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${CheckSqure});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:before {
    opacity: 0;
  }

  input[type='checkbox'] + label:after {
    content: '';
    position: absolute;
    left: 12rem; // -2.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${CheckSqureOrange});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;

const TopicOption = styled.button<{ isActive: boolean }>`
  position: relative;
  display: inline-block;
  padding: 1rem 2rem;
  margin-right: 2rem;
  font-size: 1.4rem;
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
  color: ${({ isActive, theme }) => (isActive ? theme.color.white : theme.color.gray400)};
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.color.primary500};
`;

const Header = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  padding: 2rem 0rem;
  display: flex;

  &:first-of-type {
    gap: 50rem;
  }
`;
