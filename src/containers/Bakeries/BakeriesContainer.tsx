import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BakeriesItemEntity, useBakeries } from '@/apis';
import { BakeriesTable } from '@/components/Bakeries';
import { Button, SearchBar, Pagination, Loading, TableLoading, Header, TableCell, StatusCell } from '@/components/Shared';
import { BAKERY_STATUS_OPTIONS, PATH } from '@/constants';
import usePagination from '@/hooks/usePagination';
import usePrevious from '@/hooks/usePrevious';
import { formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

export const BakeriesContainer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState('');
  const { currPage, totalItemCount, leftPosition, onChangeTotalCount, onSetPage, onSetNext, onSetPrev, onSetEnd, onSetStart } = usePagination({
    perCount: PER_COUNT,
  });

  const { bakeriesQuery, searchBakeriesQuery } = useBakeries();
  const { data, isLoading, isFetching } = bakeriesQuery({ name: searchParams.get('keyword'), page: currPage });
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = searchBakeriesQuery({ name: searchParams.get('keyword'), page: currPage });

  const prevKeyword = usePrevious(searchParams.get('keyword'));

  const changeTotalCount = (data?: { bakeries: BakeriesItemEntity[]; totalCount: number }) => {
    if (data && data.totalCount) {
      onChangeTotalCount(data.totalCount);
    }
  };

  React.useEffect(() => {
    changeTotalCount(searchData || data);
  }, [searchData, data]);

  React.useEffect(() => {
    const keyword = searchParams.get('keyword');
    const page = Number(searchParams.get('page'));

    keyword ? setSearchText(keyword) : setSearchText('');
    onSetPage(page);
  }, [searchParams]);

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const onClickCreate = () => {
    navigate(`${PATH.Bakeries}/new`);
  };

  const onSearch = () => {
    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText.length === 0) {
      return;
    }
    const page = prevKeyword !== trimmedSearchText ? 0 : currPage;
    navigate(`${PATH.Bakeries}/search?keyword=${trimmedSearchText}&page=${page}`);
  };

  const setPageWithNavigate = (callback: (page: number) => void) => (page: number) => {
    const params = searchParams.get('keyword') || '';
    const path = params.length ? `${PATH.Bakeries}/search?keyword=${params}&page=${page}` : `${PATH.Bakeries}/all?&page=${page}`;
    navigate(path);
    callback(page);
  };

  const havePrevData = !!searchData?.bakeries?.length || !!data?.bakeries?.length;
  const loading = isLoading || isLoadingSearch || isFetching || isFetchingSearch;

  const bakeryData = getBakeryTableData(searchParams.get('keyword') && searchData?.bakeries ? searchData?.bakeries : data?.bakeries ? data.bakeries : []);

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
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={getBakeryTableData([]).headers} />}>
          <BakeriesTable headers={bakeryData.headers} rows={bakeryData.rows} />
        </Loading>
        <Pagination
          totalCount={totalItemCount || 200}
          perCount={PER_COUNT}
          currPage={currPage}
          leftPosition={leftPosition}
          onClickPage={setPageWithNavigate(onSetPage)}
          onClickNext={onSetNext}
          onClickPrev={onSetPrev}
          onClickEnd={onSetEnd}
          onClickStart={onSetStart}
        />
      </Container>
    </>
  );
};

export const getBakeryTableData = (contents: BakeriesItemEntity[]) => {
  const headers = [
    { key: 'bakeryId', name: '빵집 번호' },
    { key: 'name', name: '빵집 이름' },
    // { key: '-', name: '알람' } 나중에 추가
    { key: 'createdAt', name: '등록일' },
    { key: 'modifiedAt', name: '마지막 수정일' },
    { key: 'status', name: '상태' },
  ];

  let rows: TableCell[] = [];
  if (contents.length > 0) {
    rows = contents.map(item => {
      const status = formatTextToOptionObj({ constants: BAKERY_STATUS_OPTIONS, targetText: item.status });
      return {
        ...item,
        status: <StatusCell color={status.color} text={status.text} />,
      };
    });
  }

  return { headers, rows };
};

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
