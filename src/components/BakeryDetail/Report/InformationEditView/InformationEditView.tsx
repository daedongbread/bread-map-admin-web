import React, { useEffect } from 'react';
import { useBakery } from '@/apis';
import { InfoEditRequestCard } from '@/components/BakeryDetail/Report/InformationEditView/InfoEditRequestCard';
import { Pagination } from '@/components/Shared';
import usePagination from '@/hooks/usePagination';
import { Divider } from '@/styles';

type Props = {
  bakeryId: number;
};

const TEMP_SIZE = 5;

export const InformationEditView = ({ bakeryId }: Props) => {
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { bakeryInfoUpdateRequestsQuery, completeBakeryInfoUpdateRequest, deleteBakeryInfoUpdateRequest } = useBakery({ bakeryId });
  const { data, isLoading: isLoadingSearch, isFetching: isFetchingSearch } = bakeryInfoUpdateRequestsQuery({ bakeryId: bakeryId, page: currPage });

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
    <div>
      {data?.bakeryInfoUpdateRequests.map((bakeryInfoUpdateRequestEntity, idx) => {
        return (
          <div key={`card-${idx}`}>
            <InfoEditRequestCard data={bakeryInfoUpdateRequestEntity} onCompleteRequest={onCompleteRequest} onDeleteRequest={onDeleteRequest} />
            {idx < data?.bakeryInfoUpdateRequests.length - 1 && <Divider />}
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
    </div>
  );
};
