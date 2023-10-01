import React, { useEffect, useState } from 'react';
import { BakeryImageEntity, BakeryImageType, GetBakeryImageMenuBarResponse, useBakery } from '@/apis';
import { Gallery } from '@/components/BakeryDetail/Report/ImageEditView/Gallery';
import { ImageDiffUploader } from '@/components/BakeryDetail/Report/ImageEditView/ImageDiffUploader';
import { ReportContentArea } from '@/components/BakeryDetail/Report/ReportContentArea';
import { Pagination, Tab } from '@/components/Shared';
import { BAKERY_IMG_TAB } from '@/constants';
import usePagination from '@/hooks/usePagination';
import useTab from '@/hooks/useTab';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm, changeMenuImg } from '@/store/slices/bakery';
import { Divider } from '@/styles';
import { getNumberFromValue, isNumber, urlToFile } from '@/utils';
import styled from '@emotion/styled';

type Props = {
  bakeryId: number;
};

export const ImageEditView = ({ bakeryId }: Props) => {
  const dispatch = useAppDispatch();
  const { form, currentImageUploader } = useAppSelector(selector => selector.bakery);

  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { tabs: imgTabs, selectTab: selectImgTab, setTabCount: setImgTabCount } = useTab({ tabData: BAKERY_IMG_TAB });
  const [activeTab, setActiveTab] = useState(imgTabs.find(tab => tab.isActive));
  const { bakeryImagesQuery, uploadImage, deleteImage, bakeryImageMenuBarQuery } = useBakery({ bakeryId });
  const { data, isLoading, isFetching } = bakeryImagesQuery({
    bakeryId: bakeryId,
    imageType: activeTab!.value as keyof BakeryImageType as BakeryImageType,
    page: currPage,
  });
  const { data: menuBarData } = bakeryImageMenuBarQuery({
    bakeryId: bakeryId,
  });
  type DynamicKey = `${keyof GetBakeryImageMenuBarResponse}`;
  const [selectedImage, setSelectedImage] = useState<BakeryImageEntity | undefined>();

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
    setSelectedImage(image);
  };

  const createAndGetImageUrl = async () => {
    const imageUrl = selectedImage?.image;
    if (!imageUrl) {
      return;
    }

    const formData = new FormData();
    const file = await urlToFile(imageUrl, 'bread.jpg');
    formData.append('image', file);
    const result = await uploadImage.mutateAsync({ payload: formData });
    return result.imagePath;
  };

  const fillBakeryFormImage = async ({ isFromUser, imageUrl }: { isFromUser: boolean; imageUrl: string }) => {
    if (!currentImageUploader) {
      return;
    }

    let url = imageUrl;
    if (isFromUser) {
      const result = await createAndGetImageUrl();
      result ? (url = result) : window.alert('이미지 반영을 실패했습니다. 다시 시도해주세요.');
    }

    if (currentImageUploader.type === 'image') {
      dispatch(changeForm({ name: 'images', value: [url] }));
    } else {
      if (isNumber(currentImageUploader?.currMenuIdx)) {
        dispatch(
          changeMenuImg({
            currIdx: getNumberFromValue(currentImageUploader.currMenuIdx),
            imgPreview: url,
          })
        );
      }
    }
  };

  const handleDeleteBakeryImage = async (imageId: number, imageUrl: string) => {
    const formImage = form.images ? form.images[0] || '' : '';
    const hasFormImageUrl = formImage === imageUrl || form.productList.some(item => item.image === imageUrl);
    if (hasFormImageUrl) {
      window.alert('사용중인 이미지입니다. 변경후 시도해주세요.');
      return;
    }

    if (window.confirm('이미지를 삭제하시겠습니까? 삭제시 대표/메뉴 이미지로 사용할 수 없습니다.')) {
      const imageType = imgTabs.find(tab => tab.isActive)?.value;
      if (!imageType) {
        return;
      }
      await deleteImage.mutateAsync({ bakeryId, imageId, imageType: imageType as BakeryImageType });
    }
  };

  const getEmptyName = () => {
    const tabName = imgTabs.find(tab => tab.isActive)?.name;
    return tabName ?? '이미지를 불러오지 못했습니다. 대동빵 팀에 문의해주세요.';
  };

  return (
    <Container>
      <ImageDiffUploader selectedImage={selectedImage} onChangeImage={onChangeImage} fillBakeryFormImage={fillBakeryFormImage} />
      <Divider />
      <div className="tabs">
        {imgTabs.map((item, idx) => (
          <Tab
            key={`tab-${idx}`}
            tab={item}
            count={menuBarData ? menuBarData[`${item.value}Num` as DynamicKey] : 0}
            type={'plain'}
            onSelectReportTab={selectImgTab}
          />
        ))}
      </div>
      <ReportContentArea isEmpty={isLoading || isFetching || data?.images?.length === 0} emptyAreaName={getEmptyName()}>
        <Gallery images={data?.images ?? []} selectedImage={selectedImage} onChangeImage={onChangeImage} handleDeleteBakeryImage={handleDeleteBakeryImage} />
        <Pagination
          pages={pages}
          currPage={currPage}
          onClickPage={onGetPage}
          onClickNext={onGetNextPage}
          onClickPrev={onGetPrevPage}
          onClickEnd={onGetEndPage}
          onClickStart={onGetStartPage}
        />
      </ReportContentArea>
    </Container>
  );
};

const Container = styled.div`
  .tabs {
    margin-bottom: 2rem;
  }
`;
