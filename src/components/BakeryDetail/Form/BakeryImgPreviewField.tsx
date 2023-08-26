import React from 'react';
import { Preview } from '@/components/Shared';
import { useAppSelector } from '@/store/hooks';
import styled from '@emotion/styled';

type Props = {
  label: string;
};

export const BakeryImgPreviewField = ({ label }: Props) => {
  const {
    form: { productList },
  } = useAppSelector(selector => selector.bakery);

  return (
    <Container alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview
          src={productList && productList.length > 0 ? (productList[0].image as string) : ''}
          widthRem={28}
          heightRem={20}
          emptyText={'대표 이미지2 가 없습니다.'}
        />
      </RepresentativeImg>
    </Container>
  );
};

const Container = styled.div<{ alignTop?: boolean; spaceBetween?: boolean; noMargin?: boolean }>`
  display: flex;
  align-items: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};
  justify-content: ${({ spaceBetween }) => (spaceBetween ? 'space-between' : 'flex-start')};

  > label {
    width: 12rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:not(label) {
    flex: 1;
  }
`;

const RepresentativeImg = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;
