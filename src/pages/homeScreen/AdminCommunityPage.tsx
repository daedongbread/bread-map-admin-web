import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HomeCommunityEntity, useHomeCommunity } from '@/apis';
import { HomeCommunityTable } from '@/components/HomeCommunities';
import { Button, Header, Loading, Pagination, SelectOption, StatusCell, TableCell, TableLoading } from '@/components/Shared';
import { PATH } from '@/constants';
import { COMMUNITY_TABLE_HEADERS } from '@/constants/homeCommunity';
import usePagination from '@/hooks/usePagination';
import { color } from '@/styles';
import { formatTextToOptionObj } from '@/utils';
import styled from '@emotion/styled';

export const AdminCommunityPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  const [total, setTotal] = useState(0);

  const { getHomeCommunityEvents } = useHomeCommunity({ communityId: 0 });
  const { data, isLoading, isFetching } = getHomeCommunityEvents({
    page: currPage,
  });

  useEffect(() => {
    const isHaveOtherCondition = !!searchParams.get('keyword') || !!Number(searchParams.get('page')) || !!searchParams.get('filter');
    if (!isHaveOtherCondition && data) {
      setTotal(data.totalCount);
    }
  }, [data]);

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    onGetPage(page);
  }, [searchParams]);

  const onClickCreate = () => {
    navigate(`${PATH.HomeScreen.AdminCommunity}/new`);
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
    return `${PATH.HomeScreen.AdminCommunity}/all?&page=${page}`;
  };

  const havePrevData = !!data?.contents?.length;
  const loading = isLoading || isFetching;

  const communityData = getHomeCommunityTableData(data?.contents ? data.contents : []);

  return (
    <>
      <Header name={'커뮤니티'} />
      <Container>
        <TopContainer>
          <Button text={'신규등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />
        </TopContainer>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={COMMUNITY_TABLE_HEADERS} />}>
          <HomeCommunityTable headers={communityData.headers} rows={communityData.rows} />
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

export const getHomeCommunityTableData = (contents: HomeCommunityEntity[]) => {
  let rows: TableCell[] = [];
  if (contents.length > 0) {
    // status, alarms 수정
    rows = contents.map(item => {
      const fixedStatus = formatTextToOptionObj({
        constants: COMMUNITY_FIXED_STATUS_OPTIONS,
        targetText: item.isFixed.toString(),
      });
      const carouselStatus = formatTextToOptionObj({
        constants: COMMUNITY_CAROUSEL_STATUS_OPTIONS,
        targetText: item.isCarousel.toString(),
      });
      const postedStatus = formatTextToOptionObj({
        constants: COMMUNITY_POSTED_STATUS_OPTIONS,
        targetText: item.isPosted.toString(),
      });

      return {
        managerId: item.managerId,
        nickname: item.nickname,
        title: item.title,
        createdAt: item.createdAt,
        isFixed: <StatusCell color={fixedStatus.color} text={fixedStatus.text} />,
        isPosted: <StatusCell color={postedStatus.color} text={postedStatus.text} />,
        isCarousel: <StatusCell color={carouselStatus.color} text={carouselStatus.text} />,
      };
    });
  }

  return { headers: COMMUNITY_TABLE_HEADERS, rows };
};

const Container = styled.div`
  padding: 3rem 6rem;
`;

const TopContainer = styled.div`
  display: flex;
  height: 6.8rem;
  margin-bottom: 2.8rem;
  justify-content: flex-end;
`;

const COMMUNITY_FIXED_STATUS = {
  Unfixed: 'false',
  fixed: 'true',
};

export const COMMUNITY_FIXED_STATUS_OPTIONS: SelectOption[] = [
  { name: '미고정', value: COMMUNITY_FIXED_STATUS.Unfixed, color: color.red },
  { name: '고정됨', value: COMMUNITY_FIXED_STATUS.fixed, color: color.green },
];

const COMMUNITY_CAROUSEL_STATUS = {
  true: 'true',
  false: 'false',
};

export const COMMUNITY_CAROUSEL_STATUS_OPTIONS: SelectOption[] = [
  { name: '노출중', value: COMMUNITY_CAROUSEL_STATUS.true, color: color.green },
  { name: '비노출', value: COMMUNITY_CAROUSEL_STATUS.false, color: color.red },
];

const COMMUNITY_POSTED_STATUS = {
  true: 'true',
  false: 'false',
};

export const COMMUNITY_POSTED_STATUS_OPTIONS: SelectOption[] = [
  { name: '게시중', value: COMMUNITY_POSTED_STATUS.true, color: color.green },
  { name: '미게시', value: COMMUNITY_POSTED_STATUS.false, color: color.red },
];
