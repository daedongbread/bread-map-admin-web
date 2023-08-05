import React, { useCallback, useState } from 'react';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { CurationBakery } from '@/components/HomeFeedDetail/CurationBakery';
import { CurationBannerImgField } from '@/components/HomeFeedDetail/CurationBannerImgField';
import { Button, ReadOnlyInputField } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm, addCuration, Curation } from '@/store/slices/homeFeed';
import styled from '@emotion/styled';

type Props = {
  isEdit: boolean;
  openModal: () => void;
  closeModal: () => void;
  onOpenModalByType: ({ type, index }: { type: 'bakery' | 'bread'; index: number }) => void;
};

export const FeedForm = ({ isEdit, openModal, closeModal, onOpenModalByType }: Props) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(selector => selector.homeFeed);
  const { category, subTitle, introduction, conclusion, curations, activeTime, thumbnailUrl, likeCounts, uploadDate, uploadTime, reason } = form;

  const onChangeForm = useCallback((payload: { name: string; value: string }) => {
    dispatch(changeForm(payload));
  }, []);

  const onAddCuration = useCallback(() => {
    dispatch(addCuration());
  }, []);

  return (
    <Container>
      <TextField label={'카테고리'} name={'category'} value={String(category)} placeholder={'1: 월별 트렌드 빵집, 2: 추천 빵집'} onChangeForm={onChangeForm} />
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
      <TextField textarea label={'게시일시'} name={'uploadDate'} value={uploadDate || ''} placeholder={'YYYY-MM-DD'} onChangeForm={onChangeForm} />
      <TextField
        textarea
        label={'시간'}
        name={'uploadTime'}
        value={uploadTime || ''}
        placeholder={'ex) 오후 11시 업로드 -> 23:00:00 / 오전 7시 업로드 -> 07:00:00'}
        onChangeForm={onChangeForm}
      />
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
`;
