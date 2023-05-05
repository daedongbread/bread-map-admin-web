import React, { useEffect } from 'react';
import { useBakery } from '@/apis';
import { SelectableReviewCard } from '@/components/BakeryDetail/Report/NewReviewView/SelectableReviewCard';
import { ReportContentArea } from '@/components/BakeryDetail/Report/ReportContentArea';
import { ReportTabTitle } from '@/components/BakeryDetail/Report/ReportTabTitle';
import { Pagination } from '@/components/Shared';
import { BAKERY_REPORT_TAB } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { Divider } from '@/styles';

type Props = {
  bakeryId: number;
};

export const NewReviewView = ({ bakeryId }: Props) => {
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { bakeryNewReviewsQuery, updateBakeryNewReviewExposeStatus, updateBakeryNewReviewImages, deleteBakeryNewReview } = useBakery({
    bakeryId,
  });
  const { data, isLoading, isFetching } = bakeryNewReviewsQuery({
    bakeryId,
    page: currPage,
  });

  useEffect(() => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
    }
  }, [data]);

  const onChangeReviewImages = (reviewId: number, imageIdList: number[]) => {
    if (window.confirm(`선택한 사진들을 '대표/메뉴 이미지' 탭에 저장하시겠습니까?`)) {
      updateBakeryNewReviewImages.mutate({ bakeryId, reviewId, imageIdList });
    }
  };

  const onDeleteReview = (reviewId: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까? 삭제시 앱에서 리뷰가 지워집니다. ')) {
      deleteBakeryNewReview.mutate({ bakeryId, reviewId });
    }
  };

  const onHideReview = (reviewId: number) => {
    if (window.confirm('리뷰를 숨김처리 하시겠습니까? 리뷰 검토 및 사진 추가 후 진행해주세요.')) {
      updateBakeryNewReviewExposeStatus.mutate({ bakeryId, reviewId });
    }
  };

  return (
    <ReportContentArea isEmpty={data?.bakeryNewReviews?.length === 0} emptyAreaName={'신규 리뷰'}>
      <>
        <ReportTabTitle title={BAKERY_REPORT_TAB[3].name} count={data?.totalCount || 0} />
        {data?.bakeryNewReviews.map((newReview, idx) => {
          return (
            <div key={`review-${newReview.reviewId}`}>
              <SelectableReviewCard
                newReview={newReview}
                onChangeReviewImages={onChangeReviewImages}
                onDeleteReview={onDeleteReview}
                onHideReview={onHideReview}
              />
              {idx < data?.bakeryNewReviews.length - 1 && <Divider noMargin />}
            </div>
          );
        })}
        <Pagination
          pages={pages}
          currPage={currPage}
          onClickPage={onGetPage}
          onClickNext={onGetNextPage}
          onClickPrev={onGetPrevPage}
          onClickEnd={onGetEndPage}
          onClickStart={onGetStartPage}
        />
      </>
    </ReportContentArea>
  );
};
