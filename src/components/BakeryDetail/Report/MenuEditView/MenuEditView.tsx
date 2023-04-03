import React, { useEffect } from 'react';
import { useBakery } from '@/apis';
import { SelectableMenuCard } from '@/components/BakeryDetail/Report/MenuEditView/SelectableMenuCard';
import { Pagination } from '@/components/Shared';
import usePagination from '@/hooks/usePagination';

type Props = {
  bakeryId: number;
};

export const MenuEditView = ({ bakeryId }: Props) => {
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { bakeryMenuReportsQuery, updateMenuReportImages, deleteMenuReport } = useBakery({ bakeryId });
  const {
    data,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = bakeryMenuReportsQuery({
    bakeryId: bakeryId,
    page: currPage,
  });

  useEffect(() => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
    }
  }, [data]);

  const onChangeMenuReportImages = (reportId: number, imageIdList: number[]) => {
    updateMenuReportImages.mutate({ bakeryId, reportId, imageIdList });
  };

  const onDeleteMenuReport = (reportId: number) => {
    deleteMenuReport.mutate({ bakeryId, reportId });
  };

  return (
    <div>
      {data?.menuReports.map((menuReport, idx) => {
        return (
          <SelectableMenuCard
            key={`menu-report-${idx}`}
            menuReport={menuReport}
            onChangeMenuReportImages={onChangeMenuReportImages}
            onDeleteMenuReport={onDeleteMenuReport}
          />
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
