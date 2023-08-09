import React, { useCallback, useEffect, useState } from 'react';
import { GetHomeRankingResponse, SimpleBakeryInfoEntity, useHomeRanking } from '@/apis/homeRanking';
import { HomeRankingModalTable } from '@/components/HomeRanking/HomeRankingModalTable';
import { HomeRankingTable } from '@/components/HomeRanking/HomeRankingTable';
import { TextRangeField } from '@/components/HomeRanking/TextRangeField';
import { Button, Header, Loading, TableCell, TableLoading } from '@/components/Shared';
import { ModalPortal } from '@/components/Shared/Modal';
import { BAKERY_TABLE_HEADERS, PATH } from '@/constants';
import { HOME_FEED_TABLE_HEADERS } from '@/constants/homeFeed';
import useModal from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { getDatesBetween, getMonday, getWeekRange, minusDay } from '@/utils/date';
import styled from '@emotion/styled';

export const RankingPage = () => {
  const { addToast } = useToast();
  const [baseDate, setBaseDate] = useState<{ start: string; end: string }>(
    getWeekRange({
      type: 'THIS',
      dateStr: getMonday(new Date()),
    })
  );
  const { modalOn, openModal, closeModal } = useModal();
  const [modalDate, setModalDate] = useState<string>('');

  const { homeRankingQuery, updateRanking } = useHomeRanking();
  const { data, isLoading, isFetching } = homeRankingQuery({
    startDate: baseDate.start,
  });
  const [modalData, setModalData] = useState<SimpleBakeryInfoEntity[]>([]);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  };

  const rankingModalEvent = {
    draggable: {
      on: true,
      dragEndFn: (dropResult: { source: { index: number }; destination: { index: number } }) => {
        if (!data || !dropResult.destination) {
          return;
        }
        const sorted = reorder(modalData, dropResult.source.index, dropResult.destination.index);
        setModalData(sorted);
      },
    },
    hover: {
      on: false,
    },
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setModalData(data.simpleBakeryInfoList.filter(bakeryInfo => bakeryInfo.calculatedDate === modalDate).sort((a, b) => a.rank - b.rank));
  }, [modalDate]);

  const onClickPrevWeek = useCallback(() => {
    setBaseDate(getWeekRange({ type: 'PREV', dateStr: baseDate.start }));
  }, [baseDate.start]);

  const onClickNextWeek = useCallback(() => {
    setBaseDate(getWeekRange({ type: 'NEXT', dateStr: baseDate.start }));
  }, [baseDate.start]);

  const onClickModalSave = () => {
    updateRanking.mutate(
      { bakeryRankInfoList: modalData.map(v => ({ id: v.id, rank: v.rank })) },
      {
        onSuccess: () => {
          addToast('빵집 랭킹 수정을 완료했습니다.', 'error', 3000);
          closeModal();
        },
      }
    );
  };

  const onClickModalClose = () => {
    closeModal();
    setModalData(getHomeRankingModalTableData(baseDate, modalDate, modalData).rows);
  };

  const havePrevData = !!data?.startDate;
  const loading = isLoading || isFetching;

  const homeRankingData = getHomeRankingTableData(baseDate, data);
  const homeRankingModalData = getHomeRankingModalTableData(baseDate, modalDate, modalData);
  const getAvailableHeaderNames = () => {
    const result: Set<string> = new Set<string>();
    homeRankingData.headers.map(value => {
      homeRankingData.rows.filter(row => {
        if (row[value.key] !== '미등록') {
          result.add(value.name);
        }
      });
    });
    return Array.from(result);
  };
  const rankingEvent = {
    hover: {
      on: false,
    },
    move: {
      on: true,
      basePath: PATH.HomeScreen.Ranking,
    },
    headerClick: {
      on: true,
      fn: (header: { key: string; name: string }) => {
        setModalDate(header.key);
        openModal();
      },
    },
    headerStyle: {
      headerNames: getAvailableHeaderNames(),
    },
  };
  return (
    <>
      <Header name={'랭킹 관리'} />
      <Container>
        <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_TABLE_HEADERS} />}>
          <HomeRankingTable headers={homeRankingData.headers} rows={homeRankingData.rows} event={rankingEvent} />
        </Loading>
        <BtnContainer justifyContent={'flex-start'}>
          <Button type={'white'} btnSize={'small'} fontSize={'x-small'} text={'1주 전'} onClickBtn={onClickPrevWeek} />
          <Button type={'white'} btnSize={'small'} fontSize={'x-small'} text={'1주 후'} onClickBtn={onClickNextWeek} />
        </BtnContainer>
      </Container>
      {modalOn && (
        <ModalPortal title={`${new Date(modalDate).getMonth() + 1}/${new Date(modalDate).getDate()} 랭킹`} closeModal={closeModal}>
          <TextRangeField label={'조회 기간'} name={'title'} startValue={minusDay(modalDate, 8)} endValue={minusDay(modalDate, 1)} />
          <HomeRankingModalTable
            headers={homeRankingModalData.headers}
            rows={homeRankingModalData.rows.filter((_ignore, idx) => idx < 30)}
            event={rankingModalEvent}
          />
          <BtnContainer justifyContent={'center'}>
            <Button type={'white'} btnSize={'medium'} fontSize={'medium'} text={'취소'} onClickBtn={onClickModalClose} />
            <Button type={'orange'} btnSize={'medium'} fontSize={'medium'} text={'저장'} onClickBtn={onClickModalSave} />
          </BtnContainer>
        </ModalPortal>
      )}
    </>
  );
};

export const getHomeRankingTableHeaders = (data: GetHomeRankingResponse, baseDate: { start: string; end: string }) => {
  const datesBetween = getDatesBetween(baseDate.start, baseDate.end);
  return datesBetween.map(date => {
    const dateObj = new Date(date);
    const dateName = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    return { key: date, name: dateName };
  }); // { key: '2022-12-13', name: '12/13' }
};

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

export const getHomeRankingModalTableData = (
  baseDate: {
    start: string;
    end: string;
  },
  modalDate: string,
  data: SimpleBakeryInfoEntity[]
) => {
  if (!data) {
    return { headers: HOME_FEED_TABLE_HEADERS, rows: [] };
  }
  return {
    headers: [
      { key: 'rank', name: '순위' },
      { key: 'bakeryName', name: '빵집명' },
      { key: 'address', name: '주소' },
      { key: 'viewCount', name: '조회수' },
      { key: 'flagCount', name: '깃발' },
      { key: 'score', name: '스코어' },
    ],
    rows: data,
  };
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

const BtnContainer = styled.div<{ justifyContent: 'flex-start' | 'center' }>`
  display: flex;
  justify-content: ${({ justifyContent }) => `${justifyContent}`};
  gap: 1.6rem;
  margin-top: 2rem;
`;
