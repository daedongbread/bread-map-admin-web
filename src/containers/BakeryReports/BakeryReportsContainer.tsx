import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BakeryReportsItemEntity, useBakeryReports } from '@/apis';
import { BakeryReportsTable } from '@/components/BakeryReports';
import { Header, Loading, Pagination, StatusCell, TableCell, TableLoading } from '@/components/Shared';
import { BAKERY_REPORT_STATUS_OPTIONS, BAKERY_REPORT_TABLE_HEADERS, PATH } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

export const BakeryReportsContainer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();

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

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    onGetPage(page);
  }, [searchParams]);

  const setPageAndNavigateWithArgs = (callback: (page: number) => void) => (page: number) => {
    const path = getPagePath(page);
    navigate(path);
    callback(page);
  };

  const setPageAndNavigateWithoutArgs = (callback: () => number) => () => {
    const page = callback();
    const path = getPagePath(page);
    navigate(path);
  };

  const getPagePath = (page: number) => {
    return `${PATH.BakeryReports}?page=${page}`;
  };

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
          onClickPage={setPageAndNavigateWithArgs(onGetPage)}
          onClickNext={setPageAndNavigateWithoutArgs(onGetNextPage)}
          onClickPrev={setPageAndNavigateWithoutArgs(onGetPrevPage)}
          onClickEnd={setPageAndNavigateWithoutArgs(onGetEndPage)}
          onClickStart={setPageAndNavigateWithoutArgs(onGetStartPage)}
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
