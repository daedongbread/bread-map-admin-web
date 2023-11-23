import React, { useEffect, useState } from 'react';
import { SearchKeywordCountResponse, SearchKeywordRankEntity, useManageSearchKeyword } from '@/apis/manageSearchKeyword';
import { ManageSearchKeywordCountTable, ManageSearchKeywordRankTable } from '@/components/ManageSearchKeyword';
import { BasicSelectOption, BasicSelectTrigger, Button, Header, Input, Loading, SelectBox, SelectOption, TableCell, TableLoading } from '@/components/Shared';
import { Hamburger } from '@/components/Shared/Icons';
import { SEARCH_KEYWORD_COUNT_TABLE_HEADERS, SEARCH_KEYWORD_RANK_TABLE_HEADERS } from '@/constants/searchKeyword';
import useSelectBox from '@/hooks/useSelectBox';
import { useToast } from '@/hooks/useToast';
import { color } from '@/styles';
import styled from '@emotion/styled';

export const ManageSearchesPage = () => {
  const { addToast } = useToast();
  const { isOpen, selectedOption, onToggleSelectBox, onCloseSelectBox, onSelectOption } = useSelectBox(SORT_OPTIONS[0]);
  const { searchKeywordRankingQuery, searchKeywordCountsQuery, updateRanks } = useManageSearchKeyword();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [screenRankData, setScreenRankData] = useState<SearchKeywordRankEntity[]>([]);
  const onChangeText = (text: string) => {
    if (text.length > 10) {
      return;
    }
    setSearchKeyword(text);
  };
  const onClickAdd = () => {
    setScreenRankData([
      ...screenRankData,
      {
        keyword: searchKeyword,
        rank: screenRankData.length + 1,
      },
    ]);
    setSearchKeyword('');
  };
  const onClickSave = () => {
    updateRanks.mutate(
      { HotKeywordList: screenRankData },
      {
        onSuccess: () => {
          addToast('인기 검색어 저장을 완료했습니다.', 'error', 3000);
        },
      }
    );
  };

  const handleRemoveSearchKeywordItem = (item: SearchKeywordRankEntity) => {
    setScreenRankData([...screenRankData.filter(data => data.keyword !== item.keyword)]);
  };

  const getSearchKeywordRankTableData = (contents: SearchKeywordRankEntity[]) => {
    let rows: TableCell[] = [];
    if (contents.length > 0) {
      // status, alarms 수정
      rows = contents.map(item => {
        return {
          icon: (
            <div style={{ maxWidth: '100px', textAlign: 'center', padding: '0 2rem' }}>
              <Hamburger />
            </div>
          ),
          rank: item.rank,
          keyword: <div style={{ textAlign: 'left', width: '500px' }}>{item.keyword}</div>,
          remove: (
            <Button
              text={'삭제'}
              type={'white'}
              btnSize={'small'}
              onClickBtn={() => {
                handleRemoveSearchKeywordItem(item);
              }}
            />
          ),
        };
      });
    }

    return { headers: SEARCH_KEYWORD_RANK_TABLE_HEADERS, rows };
  };

  const { data: rankData, isLoading: isLoadingRank, isFetching: isFetchingRank } = searchKeywordRankingQuery();

  useEffect(() => {
    if (!rankData) {
      return;
    }
    setScreenRankData(rankData);
  }, [rankData]);

  const {
    data: countData,
    isLoading: isLoadingCount,
    isFetching: isFetchCount,
  } = searchKeywordCountsQuery({
    sortType: selectedOption ? (selectedOption.value as 'ONE_WEEK' | 'ONE_MONTH' | 'THREE_MONTH') : 'THREE_MONTH',
  });
  const searchKeywordCountData = getSearchKeywordCountTableData(countData || []);
  const havePrevCountData = !!countData?.length;

  const loadingCount = isLoadingCount || isFetchCount;
  const searchKeywordRankData = getSearchKeywordRankTableData(screenRankData || []); // TODO
  const havePrevRankData = !!rankData?.length;
  const loadingRank = isLoadingRank || isFetchingRank;

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  };

  const screenRankEvent = {
    draggable: {
      on: true,
      dragEndFn: (dropResult: { source: { index: number }; destination: { index: number } }) => {
        if (!rankData || !dropResult.destination) {
          return;
        }
        const sorted = reorder(screenRankData, dropResult.source.index, dropResult.destination.index);
        setScreenRankData(sorted);
      },
    },
    hover: {
      on: false,
    },
  };

  const onSelectSortOption = (status: SelectOption | null) => {
    if (!status) {
      return;
    }
    onSelectOption(status);
  };

  return (
    <>
      <Header name={'검색관리'} />
      <ScrollViewContainer>
        <ScrollSection>
          <SubTitleContainer>
            <SubTitle>인기 검색어 등록</SubTitle>
          </SubTitleContainer>
          <FlexContainer style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', width: '400px', gap: '10px', alignItems: 'flex-end' }}>
              <Input value={searchKeyword} onChangeInput={e => onChangeText(e.target.value)} placeholder={'등록할 검색어를 입력해주세요'} type={'plain'} />
              <SizeSpan>{searchKeyword.length}/10</SizeSpan>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <Button text={'추가'} type={'orange'} btnSize={'medium'} onClickBtn={onClickAdd} />
              <Button text={'저장'} type={'orange'} btnSize={'medium'} onClickBtn={onClickSave} />
            </div>
          </FlexContainer>
          <Container>
            <ListHeader>
              등록된 검색어
              <ListHeaderCount>{rankData?.length}</ListHeaderCount>
            </ListHeader>
            <Loading havePrevData={havePrevRankData} isLoading={loadingRank} loadingComponent={<TableLoading headers={SEARCH_KEYWORD_RANK_TABLE_HEADERS} />}>
              <ManageSearchKeywordRankTable
                headers={searchKeywordRankData.headers}
                rows={searchKeywordRankData.rows}
                event={screenRankEvent}
                hiddenHeader={true}
              />
            </Loading>
          </Container>
        </ScrollSection>
        <ScrollSection>
          <SubTitleContainer>
            <SubTitle>검색량</SubTitle>
            <SelectBox
              width={180}
              isOpen={isOpen}
              onCloseSelectBox={onCloseSelectBox}
              onToggleSelectBox={onToggleSelectBox}
              triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} />}
            >
              {SORT_OPTIONS.map((option, idx) => (
                <BasicSelectOption key={idx} option={option} onSelectOption={onSelectSortOption} />
              ))}
            </SelectBox>
          </SubTitleContainer>
          <Loading havePrevData={havePrevCountData} isLoading={loadingCount} loadingComponent={<TableLoading headers={SEARCH_KEYWORD_COUNT_TABLE_HEADERS} />}>
            <ManageSearchKeywordCountTable headers={searchKeywordCountData.headers} rows={searchKeywordCountData.rows} />
          </Loading>
        </ScrollSection>
      </ScrollViewContainer>
    </>
  );
};

export const getSearchKeywordCountTableData = (contents: SearchKeywordCountResponse[]) => {
  let rows: TableCell[] = [];
  if (contents.length > 0) {
    rows = contents.map((item, idx) => {
      return {
        id: idx + 1,
        keyword: item.keyword,
        threeMonthCount: item.threeMonthCount,
        oneMonthCount: item.oneMonthCount,
        oneWeekCount: item.oneWeekCount,
      };
    });
  }

  return { headers: SEARCH_KEYWORD_COUNT_TABLE_HEADERS, rows };
};

const SizeSpan = styled.span`
  font-size: 12px;
`;

const Container = styled.div`
  margin: 3rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 500px;
`;

const ListHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  font-size: 15px;
`;

const ListHeaderCount = styled.span`
  color: ${({ theme }) => `${theme.color.primary500}`};
  padding: 0 1rem;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const SubTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
`;

const SubTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 800;
`;

const ScrollViewContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10rem;
`;

const ScrollSection = styled.div`
  overflow: scroll;
  min-height: 80rem;
  height: 100%;
  min-width: 80rem;
  width: 100%;
  padding: 2rem 4rem;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray200};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const SORT_OPTIONS: SelectOption[] = [
  { name: '최근 3개월 검색량 순', value: 'THREE_MONTH', color: color.green },
  { name: '최근 1개월 검색량 순', value: 'ONE_MONTH', color: color.green },
  { name: '최근 일주일 검색량 순', value: 'ONE_WEEK', color: color.green },
];
