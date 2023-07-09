import React, { useEffect } from 'react';
import { useBakery } from '@/apis';
import { SelectableMenuCard } from '@/components/BakeryDetail/Report/MenuReportView/SelectableMenuCard';
import { ReportContentArea } from '@/components/BakeryDetail/Report/ReportContentArea';
import { ReportTabTitle } from '@/components/BakeryDetail/Report/ReportTabTitle';
import { Pagination } from '@/components/Shared';
import { BAKERY_REPORT_TAB } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { Divider } from '@/styles';

type Props = {
  bakeryId: number;
};

export const MenuReportView = ({ bakeryId }: Props) => {
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const { bakeryMenuReportsQuery, updateMenuReportImages, deleteMenuReport } = useBakery({ bakeryId });
  const { data, isLoading, isFetching } = bakeryMenuReportsQuery({
    bakeryId: bakeryId,
    page: currPage,
  });

  useEffect(() => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
    }
  }, [data]);

  const onChangeMenuReportImages = (reportId: number, imageIdList: number[]) => {
    if (window.confirm(`선택한 사진들을 '대표/메뉴 이미지' 탭에 저장하시겠습니까?`)) {
      updateMenuReportImages.mutate({ bakeryId, reportId, imageIdList });
    }
  };

  const onDeleteMenuReport = (reportId: number) => {
    if (window.confirm('메뉴 제보를 삭제하시겠습니까?')) {
      deleteMenuReport.mutate({ bakeryId, reportId });
    }
  };

  return (
    <ReportContentArea isEmpty={isLoading || isFetching || data?.menuReports?.length === 0} emptyAreaName={'메뉴 제보'}>
      <>
        <ReportTabTitle title={BAKERY_REPORT_TAB[1].name} count={data?.totalCount || 0} />
        {data?.menuReports.map((menuReport, idx) => {
          return (
            <div key={`menu-report-${menuReport.reportId}`}>
              <SelectableMenuCard menuReport={menuReport} onChangeMenuReportImages={onChangeMenuReportImages} onDeleteMenuReport={onDeleteMenuReport} />
              {idx < data?.menuReports.length - 1 && <Divider noMargin />}
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
