import React from 'react';
import { ImgManager, Tab } from '@/components/Shared';
import { BAKERY_IMG_TAB } from '@/constants';
import useTab from '@/hooks/useTab';
import styled from '@emotion/styled';

export const Gallery = () => {
  const { tabs: imgTabs, selectTab: selectImgTab } = useTab({ tabData: BAKERY_IMG_TAB });
  return (
    <Container>
      <div className="tabs">
        {imgTabs.map(item => (
          <Tab tab={item} type={'plain'} onSelectReportTab={selectImgTab} />
        ))}
      </div>
      <div className="img_wrapper">
        <div className="grid_view">
          {Array(15)
            .fill(0)
            .map((item, idx) => (
              <ImgManager key={`img-manager-${idx}`} isNew={true} isSelected={true} downloadUrl={''} />
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
