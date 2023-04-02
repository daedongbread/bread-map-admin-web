import React, { useEffect } from 'react';
import { BakeryImageType, useBakery } from '@/apis';
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
  const { bakeryImagesQuery } = useBakery({ bakeryId });
  const {
    data,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = bakeryImagesQuery({ bakeryId: bakeryId, imageType: BakeryImageType.BakeryReportImage, page: currPage });

  useEffect(() => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
      const activeTab = imgTabs.find(tab => tab.isActive)!;
      setImgTabCount(activeTab, data.totalCount);
    }
  }, [data]);

  return (
    <Container>
      <ImageDiffUploader />
      <Divider />
      <Gallery imgTabs={imgTabs} onSelectTab={selectImgTab} images={data?.images ?? []} />
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
