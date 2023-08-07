import React, { useCallback, useState } from 'react';
import { GetHomeRankingResponse, useHomeRanking } from '@/apis/homeRanking';
import { HomeRankingTable } from '@/components/HomeRanking/HomeRankingTable';
import { Button, FeedCategoryCell, Header, Loading, Pagination, SearchBar, StatusCell, TableCell, TableLoading } from '@/components/Shared';
import { ModalPortal } from '@/components/Shared/Modal';
import { BAKERY_TABLE_HEADERS } from '@/constants';
import { HOME_FEED_CATEGORY_OPTIONS, HOME_FEED_STATUS_OPTIONS, HOME_FEED_TABLE_HEADERS } from '@/constants/homeFeed';
import useModal from '@/hooks/useModal';
import { getDatesBetween, getMonday, getWeekRange } from '@/utils/date';
import styled from '@emotion/styled';

export const RankingPage = () => {
  const [baseDate, setBaseDate] = useState<{ start: string; end: string }>(getWeekRange({ type: 'THIS', dateStr: getMonday(new Date()) }));
  const { modalOn, openModal, closeModal } = useModal();

  const { homeRankingQuery } = useHomeRanking();
  const { data, isLoading, isFetching } = homeRankingQuery({
    startDate: baseDate.start,
  });

  const onClickPrevWeek = useCallback(() => {
    setBaseDate(getWeekRange({ type: 'PREV', dateStr: baseDate.start }));
  }, [baseDate.start]);

  const onClickNextWeek = useCallback(() => {
    setBaseDate(getWeekRange({ type: 'NEXT', dateStr: baseDate.start }));
  }, [baseDate.start]);

  const havePrevData = !!data?.startDate;
  const loading = isLoading || isFetching;

  const homeRankingData = getHomeRankingTableData(baseDate, data);
  return (
    <>
      <Header name={'랭킹 관리'} />
      <Container>
        {/*<TopContainer>*/}
        {/*  <Button text={'신규등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />*/}
        {/*</TopContainer>*/}
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_TABLE_HEADERS} />}>
          <HomeRankingTable headers={homeRankingData.headers} rows={homeRankingData.rows} />
        </Loading>
        <BtnContainer>
          <Button type={'white'} btnSize={'small'} fontSize={'x-small'} text={'1주 전'} onClickBtn={onClickPrevWeek} />
          <Button type={'white'} btnSize={'small'} fontSize={'x-small'} text={'1주 후'} onClickBtn={onClickNextWeek} />
        </BtnContainer>
      </Container>
      {modalOn && (
        <ModalPortal title={`랭킹`} closeModal={closeModal}>
          {/*{modalInfo?.type === 'bakery' && <BakeryModal currIdx={modalInfo.index} closeModal={closeModal} />}*/}
          {/*{modalInfo?.type === 'bread' && <BakeryMenuModal currIdx={modalInfo.index} closeModal={closeModal} />}*/}
        </ModalPortal>
      )}
    </>
  );
};

export const getHomeRankingTableHeaders = (data: GetHomeRankingResponse, baseDate: { start: string; end: string }) => {
  const datesBetween = getDatesBetween(baseDate.start, baseDate.end);
  const headers = datesBetween.map(date => {
    const dateObj = new Date(date);
    const dateName = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    console.log('dateName', dateName);
    return { key: date, name: dateName };
  });

  return headers; // { key: '2022-12-13', name: '12/13' }
};

//

export const getHomeRankingTableData = (baseDate: { start: string; end: string }, data?: GetHomeRankingResponse) => {
  if (!data) {
    return { headers: HOME_FEED_TABLE_HEADERS, rows: [] };
  }

  const rankArr: TableCell[] = Array.from({ length: 20 }, (_, idx) => ({ rank: idx + 1 }));

  const dateKeyValues = getHomeRankingTableHeaders(data, baseDate);
  const requiredDateKeys = dateKeyValues.map(item => item.key); // 필수 date들

  data?.simpleBakeryInfoList?.forEach((item, idx) => {
    const { rank, calculatedDate } = item;
    if (rank > 20) {
      return;
    }
    rankArr[rank - 1] = { ...rankArr[rank - 1], [calculatedDate]: item.bakeryName };
  });

  const emptyDateValueKeys = requiredDateKeys.filter(key => !Object.keys(rankArr[0]).includes(key)); // 가공된 rankArr[0]에, 필요한 date가 없는 key만 추출 (key = '2022-01-01')
  for (let i = 0; i < emptyDateValueKeys.length; i++) {
    rankArr.forEach((item, idx) => {
      rankArr[idx] = { ...item, [emptyDateValueKeys[i]]: '미등록' };
    });
  }

  return { headers: [{ key: 'rank', name: '순위' }, ...dateKeyValues], rows: rankArr };
};

const Container = styled.div`
  padding: 3rem 6rem;
`;

const TopContainer = styled.div`
  display: flex;
  height: 6.8rem;
  margin-bottom: 2.8rem;
  // align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 2rem;
`;
