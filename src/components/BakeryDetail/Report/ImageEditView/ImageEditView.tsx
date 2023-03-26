import React from 'react';
import { ChangeImage } from '@/components/BakeryDetail/Report/ImageEditView/ChangeImage';
import { Gallery } from '@/components/BakeryDetail/Report/ImageEditView/Gallery';
import { Divider } from '@/styles';
import styled from '@emotion/styled';

export const ImageEditView = () => {
  return (
    <Container>
      <ChangeImage />
      <Divider />
      <Gallery />
    </Container>
  );
};

const Container = styled.div`
  .tabs {
    margin-bottom: 2rem;
  }
`;
