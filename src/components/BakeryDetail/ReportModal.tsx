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
    const { userId, nickName, reportId } = row;

    dispatch(changeForm({ name: 'pioneerId', value: String(userId) as string }));
    dispatch(changeForm({ name: 'pioneerNickName', value: nickName as string }));
    dispatch(changeForm({ name: 'reportId', value: reportId as string }));
  };

  const { bakeryReportsQuery } = useBakeryReports();
  const { data, isLoading, isFetching } = bakeryReportsQuery({ page: currPage });
  const bakeryReportData = getBakeryReportTableData(data?.bakeryReports || [], ['content']);

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

  const havePrevData = !!bakeryReportsRow?.length;
  const loading = isLoading || isFetching;

  const event = {
    hover: {
      on: true,
    },
    click: {
      on: true,
      fn: (row: TableCell) => {
        onClickReportItem(row);
        closeModal();
      },
    },
  };

  return (
    <div>
      <Loading
        havePrevData={havePrevData}
        isLoading={loading}
        loadingComponent={<TableLoading headers={BAKERY_REPORT_TABLE_HEADERS.filter(h => h.key !== 'content')} />}
      >
        <Table headers={bakeryReportData.headers} rows={bakeryReportData.rows} event={event} />
      </Loading>
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
