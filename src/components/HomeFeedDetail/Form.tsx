import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { CurationBakery } from '@/components/HomeFeedDetail/CurationBakery';
import { CurationBannerImgField } from '@/components/HomeFeedDetail/CurationBannerImgField';
import { UploadTimeField } from '@/components/HomeFeedDetail/UploadTimeField';
import { BasicSelectOption, BasicSelectTrigger, Button, ReadOnlyInputField, SelectBox, SelectOption } from '@/components/Shared';
import { HOME_FEED_CATEGORY_OPTIONS, TIME_OPTIONS } from '@/constants/homeFeed';
import useSelectBox from '@/hooks/useSelectBox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm, addCuration, Curation } from '@/store/slices/homeFeed';
import { color } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  isEdit: boolean;
  categoryId: number;
  openModal: () => void;
  closeModal: () => void;
  onOpenModalByType: ({ type, index }: { type: 'bakery' | 'bread'; index: number }) => void;
};

export const FeedForm = ({ isEdit, categoryId, openModal, closeModal, onOpenModalByType }: Props) => {
  const { isOpen, selectedOption, onSelectOption, onToggleSelectBox, onCloseSelectBox } = useSelectBox(HOME_FEED_CATEGORY_OPTIONS[0]);

  const dispatch = useAppDispatch();
  const { form } = useAppSelector(selector => selector.homeFeed);
  const { category, subTitle, introduction, conclusion, curations, activeTime, thumbnailUrl, likeCounts, uploadDate, uploadTime, reason } = form;

  useEffect(() => {
    // form이 아닌, feedData를 받아서 categoryName 을 가져와서 처리해야함
    console.log('category', categoryId);
    onSelectOption(HOME_FEED_CATEGORY_OPTIONS.find(option => option.value === categoryId) || null);
  }, [categoryId]);

  const onChangeForm = useCallback((payload: { name: string; value: string }) => {
    dispatch(changeForm(payload));
  }, []);

  const onAddCuration = useCallback(() => {
    dispatch(addCuration());
  }, []);

  const onSelectCategory = useCallback((option: SelectOption | null) => {
    onSelectOption(option);
    dispatch(changeForm({ name: 'category', value: option?.value }));
  }, []);

  const onSelectUploadTime = useCallback((time: string) => {
    dispatch(changeForm({ name: 'uploadTime', value: time }));
  }, []);

  return (
    <Container>
      <div className="row">
        <label className="label-item">카테고리</label>
        <SelectBox
          width={150}
          isOpen={isOpen}
          onCloseSelectBox={onCloseSelectBox}
          onToggleSelectBox={onToggleSelectBox}
          // onToggleSelectBox={() => onToggleLinkOption(idx)}
          triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} bgColor={color.white} />}
        >
          {HOME_FEED_CATEGORY_OPTIONS.map((option, idx) => (
            <BasicSelectOption key={idx} option={option} onSelectOption={onSelectCategory} />
          ))}
        </SelectBox>
      </div>
      <TextField textarea label={'제목'} name={'subTitle'} value={subTitle || ''} placeholder={'콘텐츠 제목을 입력해 주세요.'} onChangeForm={onChangeForm} />
      <TextField
        textarea
        label={'서론'}
        name={'introduction'}
        value={introduction || ''}
        placeholder={'인사말 문구를 작성해 주세요.'}
        onChangeForm={onChangeForm}
      />
      <TextField
        textarea
        label={'결론'}
        name={'conclusion'}
        value={conclusion || ''}
        placeholder={'끝맺음 문구를 작성해 주세요.'}
        onChangeForm={onChangeForm}
      />
      {curations.map((curation, index) => (
        <CurationBakery
          key={index}
          index={index}
          bakery={curation.bakery}
          bread={curation.bread}
          reason={curation.reason}
          onOpenModalByType={onOpenModalByType}
          onChangeForm={onChangeForm}
        />
      ))}
      <div className="button-wrapper">
        <Button type={'reverseOrange'} text={'큐레이션 빵집 추가'} btnSize={'medium'} onClickBtn={onAddCuration} />
      </div>
      <TextField textarea label={'게시일'} name={'uploadDate'} value={uploadDate || ''} placeholder={'YYYY-MM-DD'} onChangeForm={onChangeForm} />
      <div className="row">
        <label className="label-item">게시시간</label>
        <UploadTimeField time={uploadTime || ''} onSelectUploadTime={onSelectUploadTime} />
      </div>
      <CurationBannerImgField label={'배너 이미지'} onChangeForm={onChangeForm} />

      <ReadOnlyInputField label={'좋아요 개수'} labelMinWidth={11} content={'0'} placeholder={'좋아요개수'} />
    </Container>
  );
};

const Container = styled.form`
  padding-top: 2rem;
  margin-bottom: 10rem;

  .button-wrapper {
    margin: 2rem 0;
    display: flex;
    justify-content: flex-end;
  }

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;

    .label-item {
      width: 12rem;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`;
