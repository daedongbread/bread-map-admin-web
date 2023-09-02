import React from 'react';
import { ImageField } from '@/components/HomeCommunityDetail/ImageField';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  imageUrls: string[];
  onChangeForm: (payload: { key: number; value: string }) => void;
  onRemoveForm: (payload: { key: number }) => void;
};

export const MultiImageField = ({ label, imageUrls, onChangeForm, onRemoveForm }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Row spaceBetween>
          <ImageField imageUrl={imageUrls[0] || ''} onChangeForm={e => onChangeForm({ key: 0, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 0 })} />
          <ImageField imageUrl={imageUrls[1] || ''} onChangeForm={e => onChangeForm({ key: 1, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 1 })} />
          <ImageField imageUrl={imageUrls[2] || ''} onChangeForm={e => onChangeForm({ key: 2, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 2 })} />
          <ImageField imageUrl={imageUrls[3] || ''} onChangeForm={e => onChangeForm({ key: 3, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 3 })} />
          <ImageField imageUrl={imageUrls[4] || ''} onChangeForm={e => onChangeForm({ key: 4, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 4 })} />
        </Row>
        <Row spaceBetween>
          <ImageField imageUrl={imageUrls[5] || ''} onChangeForm={e => onChangeForm({ key: 5, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 5 })} />
          <ImageField imageUrl={imageUrls[6] || ''} onChangeForm={e => onChangeForm({ key: 6, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 6 })} />
          <ImageField imageUrl={imageUrls[7] || ''} onChangeForm={e => onChangeForm({ key: 7, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 7 })} />
          <ImageField imageUrl={imageUrls[8] || ''} onChangeForm={e => onChangeForm({ key: 8, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 8 })} />
          <ImageField imageUrl={imageUrls[9] || ''} onChangeForm={e => onChangeForm({ key: 9, value: e.value })} onRemoveForm={e => onRemoveForm({ key: 9 })} />
        </Row>
      </RepresentativeImg>
    </Row>
  );
};

const RepresentativeImg = styled.div`
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;
