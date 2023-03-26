import React from 'react';
import { Gallery } from '@/components/BakeryDetail/Report/ImageEditView/Gallery';
import { ImageDiffUploader } from '@/components/BakeryDetail/Report/ImageEditView/ImageDiffUploader';
import { Divider } from '@/styles';
import styled from '@emotion/styled';

export const ImageEditView = () => {
  return (
    <Container>
      <ImageDiffUploader />
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
