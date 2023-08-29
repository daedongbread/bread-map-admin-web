import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CurationFeedsItemEntity, useHomeFeeds } from '@/apis';
import { FeedSearchBar, HomeFeedsTable } from '@/components/HomeFeeds';
import {
  BasicSelectOption,
  BasicSelectTrigger,
  Button,
  FeedCategoryCell,
  Header,
  Loading,
  Pagination,
  SelectBox,
  SelectOption,
  StatusCell,
  TableCell,
  TableLoading,
} from '@/components/Shared';
import { DatePickerButton } from '@/components/Shared/DatePicker';
import Check from '@/components/Shared/Icons/Check.svg';
import CheckOrange from '@/components/Shared/Icons/CheckOrange.svg';
import { BAKERY_TABLE_HEADERS, PATH } from '@/constants';
import { HOME_FEED_CATEGORY_OPTIONS, HOME_FEED_STATUS_OPTIONS, HOME_FEED_TABLE_HEADERS } from '@/constants/homeFeed';
import usePagination from '@/hooks/usePagination';
import usePrevious from '@/hooks/usePrevious';
import useSelectBox from '@/hooks/useSelectBox';
import { color } from '@/styles';
import { formatTextToFeedCategoryArr, formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

type ActivateRadioOption = '' | 'POSTING' | 'INACTIVATED';

export const FeedsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<Date | null>(new Date('2023-06-01'));
  const [createdAtValue, setCreatedAtValue] = useState<string>('2023-06-01T00:00');
  const [selectedActivateOption, setSelectedActivateOption] = useState<ActivateRadioOption>('');
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedActivateOption(e.target.value as ActivateRadioOption);
  };

  const { isOpen, selectedOption, onSelectOption, onToggleSelectBox, onCloseSelectBox } = useSelectBox(HOME_FEED_CATEGORY_OPTIONS[0]);

  const { homeFeedsQuery } = useHomeFeeds();
  const { data, isLoading, isFetching } = homeFeedsQuery({
    createdAt: createdAtValue,
    activated: selectedActivateOption,
    createBy: searchParams.get('keyword') || '',
    categoryName: categoryValue,
    page: currPage,
    size: 20,
  });

  const prevKeyword = usePrevious(searchParams.get('keyword'));

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    const page = Number(searchParams.get('page'));

    keyword ? setSearchText(keyword) : setSearchText('');
    onGetPage(page);
  }, [searchParams]);

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const onClickCreate = () => {
    navigate(`${PATH.HomeScreen.Feeds}/new`);
  };

  const onSearch = () => {
    const trimmedSearchText = searchText.trim();
    const page = prevKeyword !== trimmedSearchText ? 0 : currPage;
    navigate(`${PATH.HomeScreen.Feeds}/search?keyword=${trimmedSearchText}&page=${page}`);
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
    return params.length ? `${PATH.HomeScreen.Feeds}/search?keyword=${params}&page=${page}` : `${PATH.HomeScreen.Feeds}/all?&page=${page}`;
  };

  const onSelectCategory = useCallback((option: SelectOption | null) => {
    if (option) {
      setCategoryValue(option.name as string);
    }
    onSelectOption(option);
  }, []);

  const onChangeCreatedAt = (value: Date) => {
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    setCreatedAt(value);
    setCreatedAtValue(`${year}-${month}-${day}T00:00`);
  };

  const havePrevData = !!data?.feeds?.length;
  const loading = isLoading || isFetching;

  const homeFeedData = getHomeFeedTableData(data?.feeds ? data.feeds : []);

  return (
    <>
      <Header name={'콘텐츠 관리'} />
      <Container>
        <TopContainer>
          {/* 검색조건 */}
          <SearchBarWrapper>
            <FlexContainer gap={'30px'}>
              {/* 등록일 */}
              <FlexContainer>
                <Label>등록일</Label>
                <DatePickerButton value={createdAt} onChangeValue={onChangeCreatedAt} />
              </FlexContainer>
              {/* 드롭다운 카테고리 */}
              <FlexContainer>
                <Label>카테고리</Label>
                <SelectBox
                  width={231}
                  isOpen={isOpen}
                  onCloseSelectBox={onCloseSelectBox}
                  onToggleSelectBox={onToggleSelectBox}
                  // onToggleSelectBox={() => onToggleLinkOption(idx)}
                  triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} bgColor={color.white} />}
                >
                  {HOME_FEED_CATEGORY_OPTIONS.map((option, idx) => (
                    <BasicSelectOption key={idx} option={option} onSelectOption={onSelectCategory} />
                  ))}
                </SelectBox>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer gap={'30px'}>
              {/* 상태 radio */}
              <FlexContainer>
                <Label>상태</Label>
                <Radio>
                  <input type="radio" id="status1" value={''} checked={selectedActivateOption === ''} onChange={handleRadioChange} />
                  <label htmlFor="status1">전체</label>
                </Radio>
                <Radio>
                  <input type="radio" id="status2" value={'POSTING'} checked={selectedActivateOption === 'POSTING'} onChange={handleRadioChange} />
                  <label htmlFor="status2">게시중</label>
                </Radio>
                <Radio>
                  <input type="radio" id="status3" value={'INACTIVATED'} checked={selectedActivateOption === 'INACTIVATED'} onChange={handleRadioChange} />
                  <label htmlFor="status3">미게시</label>
                </Radio>
              </FlexContainer>
              {/* 작성자 검색바 */}
              <FlexContainer>
                <Label>작성자</Label>
                <FeedSearchBar placeholder={'작성자명 입력'} text={searchText} onChangeText={onChangeText} onSearch={onSearch} />
              </FlexContainer>
              <Button text={'조회하기'} type={'orange'} btnSize={'medium'} onClickBtn={onSearch} />
            </FlexContainer>
          </SearchBarWrapper>
          <FlexContainer justifyContent={'flex-end'}>
            <Button text={'새글등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />
          </FlexContainer>
        </TopContainer>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_TABLE_HEADERS} />}>
          <HomeFeedsTable headers={homeFeedData.headers} rows={homeFeedData.rows} />
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

export const getHomeFeedTableData = (contents: CurationFeedsItemEntity[]) => {
  let rows: TableCell[] = [];
  if (contents.length > 0) {
    // status, alarms 수정
    rows = contents.map(item => {
      const status = formatTextToOptionObj({ constants: HOME_FEED_STATUS_OPTIONS, targetText: item.isActive });
      const { categoryName } = item;
      const category = formatTextToFeedCategoryArr({
        constants: HOME_FEED_CATEGORY_OPTIONS,
        targetObj: { categoryName },
      });

      // TODO: 자동으로 매핑되도록
      return {
        ...item,
        createdAt: item.createdAt.split('T')[0],
        category: <FeedCategoryCell category={category} />,
        status: <StatusCell color={status.color} text={status.text} />,
      };
    });
  }

  return { headers: HOME_FEED_TABLE_HEADERS, rows };
};

const PER_COUNT = 20; // default로 20 놓을지 고민

const FlexContainer = styled.div<{ justifyContent?: 'flex-start' | 'flex-end'; gap?: string }>`
  display: flex;
  align-items: center;
  min-width: 30rem;
  min-height: 5rem;
  gap: ${({ gap }) => (gap ? gap : '15px')};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const Container = styled.div`
  padding: 3rem 6rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8rem;
  // align-items: center;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  height: 100%;
  margin-right: 2.4rem;
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 700;
  min-width: 5rem;
`;

const Radio = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  position: relative;

  label {
    font-size: ${({ theme }) => theme.size.fontMd};
    color: ${({ theme }) => theme.color.gray600};
    margin-left: 3rem;
  }

  input[type='radio'] {
    display: none;
  }

  input[type='radio'] + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${Check});
    opacity: 1;
    width: 24px;
    height: 24px;
  }

  input[type='radio']:checked + label:before {
    opacity: 0;
  }

  input[type='radio'] + label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${CheckOrange});
    opacity: 0;
    width: 24px;
    height: 24px;
  }

  input[type='radio']:checked + label:after {
    opacity: 1;
  }
`;
