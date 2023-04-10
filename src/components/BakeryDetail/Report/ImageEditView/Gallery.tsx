import React from 'react';
import { BakeryImageEntity } from '@/apis';
import { ImgManager } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  images: BakeryImageEntity[];
  selectedImage?: BakeryImageEntity;
  onChangeImage: (image?: BakeryImageEntity) => void;
  handleDeleteBakeryImage: (imageId: number, imageUrl: string) => void;
};

export const Gallery = ({ images, selectedImage, onChangeImage, handleDeleteBakeryImage }: Props) => {
  const onClickImage = (imageId: number) => {
    onChangeImage(selectedImage?.imageId === imageId ? undefined : images.find(image => image.imageId === imageId));
  };

  return (
    <Container>
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
              handleDeleteImage={handleDeleteBakeryImage}
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
