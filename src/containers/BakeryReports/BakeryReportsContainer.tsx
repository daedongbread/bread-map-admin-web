import React, { useEffect } from 'react';
import { BakeryReportsItemEntity, useBakeryReports } from '@/apis';
import { BakeryReportsTable } from '@/components/BakeryReports';
import { Pagination, Loading, TableLoading, Header, TableCell, StatusCell } from '@/components/Shared';
import { BAKERY_REPORT_STATUS_OPTIONS, BAKERY_REPORT_TABLE_HEADERS } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

export const BakeryReportsContainer = () => {
  const { pages, currPage, onChangeTotalPageCount, onSetPage, onSetNext, onSetPrev, onSetEnd, onSetStart } = usePagination();

  const { bakeryReportsQuery } = useBakeryReports();
  const { data, isLoading, isFetching } = bakeryReportsQuery({ page: currPage });

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

  const bakeryReportData = getBakeryReportTableData(data?.bakeryReports || []);

  return (
    <>
      <Header name={'제보관리'} />
      <Container>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_REPORT_TABLE_HEADERS} />}>
          <BakeryReportsTable headers={bakeryReportData.headers} rows={bakeryReportData.rows} />
        </Loading>
        <Pagination
          pages={pages}
          currPage={currPage}
          onClickPage={onSetPage}
          onClickNext={onSetNext}
          onClickPrev={onSetPrev}
          onClickEnd={onSetEnd}
          onClickStart={onSetStart}
        />
      </Container>
    </>
  );
};

const getBakeryReportTableData = (contents: BakeryReportsItemEntity[]) => {
  let rows: TableCell[] = [];
  if (contents.length > 0) {
    rows = contents.map(item => {
      const status = formatTextToOptionObj({ constants: BAKERY_REPORT_STATUS_OPTIONS, targetText: item.status });
      return {
        ...item,
        status: <StatusCell color={status.color} text={status.text} />,
      };
    });
  }

  return { headers: BAKERY_REPORT_TABLE_HEADERS, rows };
};

const Container = styled.div`
  padding: 3rem 6rem;
`;
