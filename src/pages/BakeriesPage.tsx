import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BakeriesItemEntity, useBakeries } from '@/apis';
import { BakeriesTable, BakeryFilter, BakeryInfoAndFilter } from '@/components/Bakeries';
import { Button, Header, Loading, Pagination, SearchBar, StatusCell, TableCell, TableLoading } from '@/components/Shared';
import { BAKERY_TABLE_HEADERS, PATH } from '@/constants';
import usePagination from '@/hooks/usePagination';
import usePrevious from '@/hooks/usePrevious';
import { formatTextToOAlarmArr, formatTextToOptionObj, isNumber } from '@/utils';
import { getBakeryTableData } from '@/utils/bakery';
import styled from '@emotion/styled';

export const BakeriesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [currFilterValue, setCurrFilterValue] = useState<string[]>([]);
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const [total, setTotal] = useState(0);

  const { bakeriesQuery, bakeriesAlarmCountQuery } = useBakeries();
  const { data, isLoading, isFetching } = bakeriesQuery({
    name: searchParams.get('keyword') || '',
    page: currPage,
    filterBy: searchParams.get('filter') || '',
  });
  const { data: alarmCount } = bakeriesAlarmCountQuery();

  const prevKeyword = usePrevious(searchParams.get('keyword'));

  const changeTotalPageCount = (data?: { bakeries: BakeriesItemEntity[]; totalCount: number; totalPages: number }) => {
    if (data && isNumber(data.totalPages)) {
      const isEmptyResult = data.totalPages === 0;
      onChangeTotalPageCount(isEmptyResult ? 1 : data.totalPages);
    }
  };

  const onChangeFilter = (filter: { name: string; value: string }) => {
    setCurrFilterValue(prev => (currFilterValue.includes(filter.value) ? prev.filter(i => i !== filter.value) : [...prev, filter.value]));
  };

  useEffect(() => {
    const isHaveOtherCondition = !!searchParams.get('keyword') || !!Number(searchParams.get('page')) || !!searchParams.get('filter');
    if (!isHaveOtherCondition && data) {
      setTotal(data.totalCount);
    }
  }, [data]);

  useEffect(() => {
    // 키워드를 새로 입력하거나 필터가 변경될 때마다 페이지 초기화
    if (searchParams.get('keyword') || currFilterValue) {
      changeTotalPageCount(data);
    }
  }, [data, currFilterValue]);

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    const page = Number(searchParams.get('page'));
    const filter = searchParams.get('filter');

    filter ? setCurrFilterValue(filter.split(',')) : setCurrFilterValue([]);
    keyword ? setSearchText(keyword) : setSearchText('');
    onGetPage(page);
  }, [searchParams]);

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const onClickCreate = () => {
    navigate(`${PATH.Bakeries}/new`);
  };

  const onSearch = () => {
    const trimmedSearchText = searchText.trim();
    const page = prevKeyword !== trimmedSearchText ? 0 : currPage;
    const filter = currFilterValue.join(',');
    navigate(`${PATH.Bakeries}/search?keyword=${trimmedSearchText}&page=${page}&filter=${filter}`);
  };

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
    const params = searchParams.get('keyword') || '';
    return params.length ? `${PATH.Bakeries}/search?keyword=${params}&page=${page}` : `${PATH.Bakeries}/all?&page=${page}`;
  };

  const havePrevData = !!data?.bakeries?.length;
  const loading = isLoading || isFetching;

  const bakeryData = getBakeryTableData(data?.bakeries ? data.bakeries : [], ['address']);

  return (
    <>
      <Header name={'빵집관리'} />
      <Container>
        <TopContainer>
          <SearchBarWrapper>
            <SearchBar placeholder={'빵집 이름으로 검색하기'} text={searchText} onChangeText={onChangeText} onSearch={onSearch} />
          </SearchBarWrapper>
          <BakeryInfoAndFilter
            totalCount={total}
            alarmCount={alarmCount?.newAlarmNum}
            filter={<BakeryFilter currFilterValue={currFilterValue} onChangeFilter={onChangeFilter} />}
            searchBtn={<Button text={'조회'} type={'orange'} btnSize={'small'} onClickBtn={onSearch} />}
          />
          <Button text={'신규등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />
        </TopContainer>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_TABLE_HEADERS} />}>
          <BakeriesTable headers={bakeryData.headers} rows={bakeryData.rows} />
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

const PER_COUNT = 20; // default로 20 놓을지 고민

const Container = styled.div`
  padding: 3rem 6rem;
`;

const TopContainer = styled.div`
  display: flex;
  height: 6.8rem;
  margin-bottom: 2.8rem;
  // align-items: center;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  height: 100%;
  margin-right: 2.4rem;
`;
