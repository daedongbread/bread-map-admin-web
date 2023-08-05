import React, { useCallback } from 'react';
import { TextField } from '@/components/BakeryDetail/Form/TextField';
import { Button, ReadOnlyInputField } from '@/components/Shared';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/store/hooks';
import { changeCuration } from '@/store/slices/homeFeed';

type Props = {
  index: number;
  bakery: {
    bakeryId?: number;
    bakeryName: string;
  };
  bread: {
    productId?: number;
    productName: string;
  };
  reason: string;
  onOpenModalByType: ({ type, index }: { type: 'bakery' | 'bread'; index: number }) => void;
  onChangeForm: ({ name, value }: { name: string; value: string }) => void;
};

export const CurationBakery = ({ index, bakery, bread, reason, onOpenModalByType, onChangeForm }: Props) => {
  const dispatch = useAppDispatch();

  const handleBakerySearch = useCallback(() => {
    console.log('handle...index...', index);
    onOpenModalByType({ type: 'bakery', index });
  }, [index]);

  const handleBreadSearch = useCallback(() => {
    // TODO: 만약 빵집이 선택되지 않았다면 빵집을 먼저 선택하라는 alert를 띄워야함
    console.log('handle...index...', index);
    onOpenModalByType({ type: 'bread', index });
  }, [index]);

  const handleReasonChange = useCallback(({ name, value }: { name: string; value: string }) => {
    //
    dispatch(changeCuration({ currIdx: index, key: 'reason', value }));
  }, []);

  return (
    <Container>
      <div className="title">큐레이션 빵집 {index + 1}</div>
      <div className="curation-wrapper">
        <div className="row">
          <ReadOnlyInputField label={'빵집명'} content={bakery.bakeryName} placeholder={'빵집을 조회해 주세요.'} />
          <Button type={'orange'} text={'조회하기'} btnSize={'small'} onClickBtn={handleBakerySearch} />
        </div>
        <div className="row">
          <ReadOnlyInputField label={'빵메뉴'} content={bread.productName} placeholder={'빵집 선택 후 빵메뉴를 조회해 주세요.'} />
          <Button type={'orange'} text={'조회하기'} btnSize={'small'} disabled={!bakery.bakeryId} onClickBtn={handleBreadSearch} />
        </div>
        <div>
          <TextField
            textarea
            label={'추천이유'}
            name="reason"
            multiline
            value={reason}
            placeholder={'이 빵이 가지고 있는 특별한 매력이나 특징에 대해서 설명해 주세요.'}
            onChangeForm={handleReasonChange}
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 3rem;

  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .curation-wrapper {
    border: 1px solid #9e9e9e;
    border-radius: 10px;
    padding: 3rem;
  }

  .row {
    display: flex;
    margin-bottom: 2rem;

    > div {
      margin-right: 1rem;
    }

    label {
      width: 12rem;
      font-size: 1.5rem;
      font-weight: bold;
    }

    input {
      width: 40rem;
    }
  }
`;
