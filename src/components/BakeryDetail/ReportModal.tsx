import React, { useEffect } from 'react';
import { BakeryReportsItemEntity, useBakeryReports } from '@/apis';
import { Loading, Pagination, Table, TableCell, TableLoading } from '@/components/Shared';
import { BAKERY_REPORT_STATUS_OPTIONS, BAKERY_REPORT_TABLE_HEADERS } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { useAppDispatch } from '@/store/hooks';
import { changeForm } from '@/store/slices/bakery';
import { formatTextToOptionObj, getBakeryReportTableData } from '@/utils';

type Props = {
  closeModal: () => void;
};

export const ReportModal = ({ closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();

  const onClickReportItem = (row: TableCell) => {
    const { userId, nickName } = row;

    dispatch(changeForm({ name: 'pioneerId', value: String(userId) as string }));
    dispatch(changeForm({ name: 'pioneerNickName', value: nickName as string }));
  };

  const { bakeryReportsQuery } = useBakeryReports();
  const { data, isLoading, isFetching } = bakeryReportsQuery({ page: currPage });
  const bakeryReportData = getBakeryReportTableData(data?.bakeryReports || []);

  const bakeryReportsRow = data?.bakeryReports?.map(report => ({
    ...report,
    status: formatTextToOptionObj({ constants: BAKERY_REPORT_STATUS_OPTIONS, targetText: report.status }),
  }));

  const changeTotalPageCount = (data?: { bakeryReports: BakeryReportsItemEntity[]; totalCount: number; totalPages: number }) => {
    if (data && data.totalPages) {
      onChangeTotalPageCount(data.totalPages);
    }
  };

  useEffect(() => {
    data && changeTotalPageCount(data);
  }, [data]);

  const setPageAndNavigateWithArgs = (callback: (page: number) => void) => (page: number) => {
    // const path = getPagePath(page);
    // navigate(path);

    callback(page);
  };

  const setPageAndNavigateWithoutArgs = (callback: () => number) => () => {
    // const page = callback();
    // const path = getPagePath(page);
    // navigate(path);
  };

  const havePrevData = !!bakeryReportsRow?.length;
  const loading = isLoading || isFetching;

  const event = {
    hover: {
      on: true,
    },
    click: {
      on: true,
      fn: (row: TableCell) => {
        // TODO:
        onClickReportItem(row);
        closeModal();
      },
    },
  };

  return (
    <div>
      <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_REPORT_TABLE_HEADERS} />}>
        <Table headers={bakeryReportData.headers} rows={bakeryReportData.rows} event={event} />
      </Loading>
      <Pagination
        pages={pages}
        currPage={currPage}
        onClickPage={setPageAndNavigateWithArgs(onGetPage)}
        onClickNext={setPageAndNavigateWithoutArgs(onGetNextPage)}
        onClickPrev={setPageAndNavigateWithoutArgs(onGetPrevPage)}
        onClickEnd={setPageAndNavigateWithoutArgs(onGetEndPage)}
        onClickStart={setPageAndNavigateWithoutArgs(onGetStartPage)}
      />
    </div>
  );
};
//
// export const BakeryReportsTable = ({ headers, rows }: TableProps) => {
//   return <Table headers={headers} rows={rows} event={event} />;
// };
