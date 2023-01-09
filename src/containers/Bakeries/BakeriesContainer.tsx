import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { BakeriesItemEntity, useBakeries } from '@/apis';
import { BakeriesTable } from '@/components/Bakeries';
import { Button, SearchBar, Pagination, CompleteStatus as Status, Loading, TableLoading, Header } from '@/components/Shared';
import { BAKERY_STATUS_OPTIONS, PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';
import usePagination from '@/hooks/usePagination';
import usePrevious from '@/hooks/usePrevious';
import { formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

export const BakeriesContainer = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState('');
  const [word, setWord] = React.useState('');
  const { currPage, totalItemCount, leftPosition, onChangeTotalCount, onClickPage, onClickNext, onClickPrev, onClickEnd, onClickStart } = usePagination({
    perCount: PER_COUNT,
  });

  const { bakeriesQuery, searchBakeriesQuery } = useBakeries();
  const { data, isLoading, isFetching } = bakeriesQuery({ name: word, page: currPage });
  const { data: searchData, isLoading: isLoadingSearch, isFetching: isFetchingSearch } = searchBakeriesQuery({ name: word, page: currPage });

  const bakeriesRow = data?.bakeries.map(bakery => ({
    ...bakery,
    notification: '',
    status: formatTextToOptionObj({ constants: BAKERY_STATUS_OPTIONS, targetText: bakery.status }),
  }));
  const searchBakeriesRow = searchData?.bakeries.map(bakery => ({
    ...bakery,
    notification: '',
    status: formatTextToOptionObj({ constants: BAKERY_STATUS_OPTIONS, targetText: bakery.status }),
  }));
  const prevWord = usePrevious(word);
  // 추후 알람영역 활성화

  const changeTotalCount = (data?: { bakeries: BakeriesItemEntity[]; totalCount: number }) => {
    if (data && data.totalCount) {
      onChangeTotalCount(data.totalCount);
    }
  };

  React.useEffect(() => {
    changeTotalCount(searchData || data);
  }, [searchData, data]);

  React.useEffect(() => {
    if (prevWord !== word) {
      onClickPage(0);
    }
  });

  const bakeryColumns = React.useMemo(() => COLUMNS, []);

  const onClickBakeryItem = (bakeryId: number) => {
    navigate(`${PATH.Bakeries}/${bakeryId}`);
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const onClickCreate = () => {
    navigate(`${PATH.Bakeries}/new`);
  };

  const onSearch = () => {
    setWord(searchText);
  };

  const havePrevData = !!searchBakeriesRow?.length || !!bakeriesRow?.length;
  const loading = isLoading || isLoadingSearch || isFetching || isFetchingSearch;

  return (
    <>
      <Header name={'빵집관리'} />
      <Container>
        <TopContainer>
          <SearchBarWrapper>
            <SearchBar placeholder={'빵집 이름으로 검색하기'} text={searchText} onChangeText={onChangeText} onSearch={onSearch} />
          </SearchBarWrapper>
          <Button text={'신규등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />
        </TopContainer>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading />}>
          <BakeriesTable
            route={PATH.Bakeries}
            columns={bakeryColumns}
            data={(searchBakeriesRow && searchBakeriesRow) || (bakeriesRow && bakeriesRow) || []}
            rowClickFn={onClickBakeryItem}
          />
        </Loading>
        <Pagination
          totalCount={totalItemCount || 200}
          perCount={PER_COUNT}
          currPage={currPage}
          leftPosition={leftPosition}
          onClickPage={onClickPage}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          onClickEnd={onClickEnd}
          onClickStart={onClickStart}
        />
      </Container>
    </>
  );
};

const COLUMNS: (Column & { percentage: number })[] = [
  { accessor: 'bakeryId', Header: 'Bakery_ID', percentage: 15 },
  { accessor: 'name', Header: '빵집이름', percentage: 25 },
  { accessor: 'notification', Header: '알람', percentage: 30 },
  { accessor: 'createdAt', Header: '최초 등록일', percentage: 10 },
  { accessor: 'modifiedAt', Header: '마지막 수정일', percentage: 10 },
  {
    accessor: 'status',
    Header: '상태',
    percentage: 10,
    Cell: ({ cell: { value } }) => <Status color={value.color} text={value.text} />,
  },
];

const PER_COUNT = 20; // default로 20 놓을지 고민

const Container = styled.div`
  padding: 3rem 6rem;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.8rem;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  margin-right: 2.8rem;
`;
