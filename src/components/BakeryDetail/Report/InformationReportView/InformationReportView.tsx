import React, { useEffect } from 'react';
import { useBakery } from '@/apis';
import { InfoEditRequestCard } from '@/components/BakeryDetail/Report/InformationReportView/InfoEditRequestCard';
import { ReportContentArea } from '@/components/BakeryDetail/Report/ReportContentArea';
import { ReportTabTitle } from '@/components/BakeryDetail/Report/ReportTabTitle';
import { Pagination } from '@/components/Shared';
import { BAKERY_REPORT_TAB } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { Divider } from '@/styles';

type Props = {
  bakeryId: number;
};

export const InformationReportView = ({ bakeryId }: Props) => {
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { bakeryInfoUpdateRequestsQuery, completeBakeryInfoUpdateRequest, deleteBakeryInfoUpdateRequest } = useBakery({ bakeryId });
  const { data, isLoading, isFetching } = bakeryInfoUpdateRequestsQuery({ bakeryId: bakeryId, page: currPage });

  useEffect(() => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
    }
  }, [data]);

  const onCompleteRequest = (reportId: number) => {
    completeBakeryInfoUpdateRequest.mutate({ bakeryId, reportId });
  };

  const onDeleteRequest = (reportId: number) => {
    if (window.confirm('제보를 삭제하시겠습니까?')) {
      deleteBakeryInfoUpdateRequest.mutate({ bakeryId, reportId });
    }
  };

  return (
    <ReportContentArea isEmpty={data?.bakeryInfoUpdateRequests?.length === 0} emptyAreaName={'정보 수정 제보'}>
      <>
        <ReportTabTitle title={BAKERY_REPORT_TAB[2].name} count={data?.totalCount || 0} />
        {data?.bakeryInfoUpdateRequests.map((bakeryInfoUpdateRequestEntity, idx) => {
          return (
            <div key={`card-${idx}`}>
              <InfoEditRequestCard updateRequest={bakeryInfoUpdateRequestEntity} onCompleteRequest={onCompleteRequest} onDeleteRequest={onDeleteRequest} />
              {idx < data?.bakeryInfoUpdateRequests.length - 1 && <Divider noMargin />}
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
