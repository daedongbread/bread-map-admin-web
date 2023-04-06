import React, { useEffect } from 'react';
import { useBakery } from '@/apis';
import { InfoEditRequestCard } from '@/components/BakeryDetail/Report/InformationEditView/InfoEditRequestCard';
import { ReportTabTitle } from '@/components/BakeryDetail/Report/ReportTabTitle';
import { Error as Empty, Pagination } from '@/components/Shared';
import { BAKERY_REPORT_TAB } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { Divider } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  bakeryId: number;
};

export const InformationEditView = ({ bakeryId }: Props) => {
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
    deleteBakeryInfoUpdateRequest.mutate({ bakeryId, reportId });
  };

  return (
    <Container>
      {data?.bakeryInfoUpdateRequests?.length === 0 ? (
        <div className="empty-area">
          <Empty errMsg={'정보 수정 제보가 없습니다.'} />
        </div>
      ) : (
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
      )}
    </Container>
  );
};

const Container = styled.div`
  .empty-area {
    min-height: 60vh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
