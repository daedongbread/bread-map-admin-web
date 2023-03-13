import React from 'react';
import { ImgManager } from '@/components/Shared/ImgController';
import styled from '@emotion/styled';

export const ImageEditView = () => {
  return (
    <Container>
      <GridView>
        {Array(15)
          .fill(0)
          .map((item, idx) => (
            <ImgManager key={`img-manager-${idx}`} isNew={true} isSelected={true} downloadUrl={''} />
          ))}
      </GridView>
    </Container>
  );
};

const Container = styled.div`
  min-height: 500px;
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`;
