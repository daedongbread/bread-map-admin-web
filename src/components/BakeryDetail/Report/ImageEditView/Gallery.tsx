import React from 'react';
import { BakeryImageEntity } from '@/apis';
import { ImgManager, Tab, TabItem } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  imgTabs: TabItem[];
  onSelectTab: (tab: TabItem) => void;
  images: BakeryImageEntity[];
  selectedImage?: BakeryImageEntity;
  onChangeImage: (image?: BakeryImageEntity) => void;
};

export const Gallery = ({ imgTabs, onSelectTab, images, selectedImage, onChangeImage }: Props) => {
  const onClickImage = (imageId: number) => {
    // setSelectedImage(prev => (prev?.imageId === imageId ? undefined : images.find(image => image.imageId === imageId)));
    onChangeImage(selectedImage?.imageId === imageId ? undefined : images.find(image => image.imageId === imageId));
  };

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
            <ImgManager
              key={`img-manager-${idx}`}
              isNew={item.isNew}
              isSelected={selectedImage?.imageId === item.imageId}
              downloadUrl={item.image}
              imageId={item.imageId}
              onClickImage={onClickImage}
            />
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
