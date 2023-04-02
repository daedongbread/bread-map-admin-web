import React from 'react';
import { BakeryImageEntity } from '@/apis';
import { ImgManager, Tab, TabItem } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  imgTabs: TabItem[];
  onSelectTab: (tab: TabItem) => void;
  images: BakeryImageEntity[];
};

export const Gallery = ({ imgTabs, onSelectTab, images }: Props) => {
  return (
    <Container>
      <div className="tabs">
        {imgTabs.map((item, idx) => (
          <Tab key={`tab-${idx}`} tab={item} type={'plain'} onSelectReportTab={onSelectTab} />
        ))}
      </div>
      <div className="img_wrapper">
        <div className="grid_view">
          {images.map((item, idx) => (
            <ImgManager key={`img-manager-${idx}`} isNew={true} isSelected={true} downloadUrl={item.image} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .img_wrapper {
    min-height: 500px;
  }

  .grid_view {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
  }
`;
