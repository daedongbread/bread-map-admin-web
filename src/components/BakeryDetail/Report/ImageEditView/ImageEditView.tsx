import React, { useEffect, useState } from 'react';
import { BakeryImageEntity, BakeryImageType, useBakery } from '@/apis';
import { Gallery } from '@/components/BakeryDetail/Report/ImageEditView/Gallery';
import { ImageDiffUploader } from '@/components/BakeryDetail/Report/ImageEditView/ImageDiffUploader';
import { Pagination } from '@/components/Shared';
import { BAKERY_IMG_TAB } from '@/constants';
import usePagination from '@/hooks/usePagination';
import useTab from '@/hooks/useTab';
import { Divider } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  bakeryId: number;
};

export const ImageEditView = ({ bakeryId }: Props) => {
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { tabs: imgTabs, selectTab: selectImgTab, setTabCount: setImgTabCount } = useTab({ tabData: BAKERY_IMG_TAB });
  const [activeTab, setActiveTab] = useState(imgTabs.find(tab => tab.isActive));
  const { bakeryImagesQuery, uploadImage } = useBakery({ bakeryId });
  const {
    data,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = bakeryImagesQuery({
    bakeryId: bakeryId,
    imageType: activeTab!.value as keyof BakeryImageType as BakeryImageType,
    page: currPage,
  });
  const [changeImage, setChangeImage] = useState<BakeryImageEntity | undefined>();

  useEffect(() => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
      const activeTab = imgTabs.find(tab => tab.isActive)!;
      setImgTabCount(activeTab, data.totalCount);
    }
  }, [data]);

  useEffect(() => {
    setActiveTab(imgTabs.find(tab => tab.isActive));
  }, [imgTabs]);

  const onChangeImage = (image?: BakeryImageEntity) => {
    setChangeImage(image);
  };

  const onCreateImage = async () => {
    let imageUrl = changeImage?.image;
    const imageId = changeImage?.imageId;

    if (imageId! < 0 && imageUrl) {
      const formData = new FormData();
      const file = await urlToFile(imageUrl, 'holly.jpg', 'image/jpeg');
      formData.append('image', file);
      const result = await uploadImage.mutateAsync({ payload: formData });
      imageUrl = result.imagePath;
    }
    // TODO 현재 이미지로 반영 작업 (imageUrl)
  };
  const urlToFile = async (url: string, filename: string, mimeType: string) => {
    const response = await fetch(url, { mode: 'no-cors' });
    const buffer = await response.arrayBuffer();
    const file = new File([buffer], filename, { type: mimeType });
    return file;
  };

  return (
    <Container>
      <ImageDiffUploader changeImage={changeImage} onChangeImage={onChangeImage} onCreateImage={onCreateImage} />
      <Divider />
      <Gallery imgTabs={imgTabs} onSelectTab={selectImgTab} images={data?.images ?? []} selectedImage={changeImage} onChangeImage={onChangeImage} />
      <Pagination
        pages={pages}
        currPage={currPage}
        onClickPage={onGetPage}
        onClickNext={onGetNextPage}
        onClickPrev={onGetPrevPage}
        onClickEnd={onGetEndPage}
        onClickStart={onGetStartPage}
      />
    </Container>
  );
};

const Container = styled.div`
  .tabs {
    margin-bottom: 2rem;
  }
`;
