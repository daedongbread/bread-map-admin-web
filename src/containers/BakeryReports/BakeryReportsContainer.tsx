import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { useBakeryReports } from '@/apis';
import { BakeryReportsTable } from '@/components/BakeryReports';
import { Pagination, CompleteStatus as Status, Loading, TableLoading, Header } from '@/components/Shared';
import { BAKERY_REPORT_STATUS_OPTIONS, PATH } from '@/constants';
import usePagination from '@/hooks/usePagination';
import { formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

export const BakeryReportsContainer = () => {
  const navigate = useNavigate();
  const { currPage, totalItemCount, leftPosition, onChangeTotalCount, onSetPage, onSetNext, onSetPrev, onSetEnd, onSetStart } = usePagination({
    perCount: PER_COUNT,
  });

  const { bakeryReportsQuery } = useBakeryReports();
  const { data, isLoading, isFetching } = bakeryReportsQuery({ page: currPage });

  const bakeryReportsRow = data?.bakeryReports?.map(report => ({
    ...report,
    status: formatTextToOptionObj({ constants: BAKERY_REPORT_STATUS_OPTIONS, targetText: report.status }),
  }));

  React.useEffect(() => {
    if (data && data.totalCount) onChangeTotalCount(data.totalCount);
  }, [data]);

  const bakeryReportsColumns = useMemo(() => COLUMNS, []);

  const onClickRequestItem = (reportId: number) => {
    navigate(`${PATH.BakeryReports}/${reportId}`);
  };

  const havePrevData = !!bakeryReportsRow?.length;
  const loading = isLoading || isFetching;

  return (
    <>
      <Header name={'제보관리'} />
      <Container>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading />}>
          <BakeryReportsTable
            route={PATH.BakeryReports}
            columns={bakeryReportsColumns}
            data={(bakeryReportsRow && bakeryReportsRow) || []}
            rowClickFn={onClickRequestItem}
          />
        </Loading>
        <Pagination
          totalCount={totalItemCount || 200}
          perCount={PER_COUNT}
          currPage={currPage}
          leftPosition={leftPosition}
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

const COLUMNS: (Column & { percentage: number })[] = [
  { accessor: 'reportId', Header: 'NO.', percentage: 5 },
  { accessor: 'nickName', Header: '제보자', percentage: 9 },
  { accessor: 'bakeryName', Header: '빵집 이름', percentage: 18 },
  { accessor: 'location', Header: '빵집 위치', percentage: 18 },
  { accessor: 'content', Header: '추천 이유', percentage: 30 },
  { accessor: 'createdAt', Header: '제보날짜', percentage: 10 },
  {
    accessor: 'status',
    Header: '처리상태',
    percentage: 10,
    Cell: ({ cell: { value } }) => <Status color={value.color} text={value.text} />,
  },
];

const PER_COUNT = 20;

const Container = styled.div`
  padding: 3rem 6rem;
`;
