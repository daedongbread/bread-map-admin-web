import React, { useCallback, useEffect } from 'react';
import { BakeriesItemEntity, useBakeries } from '@/apis';
import { Loading, Pagination, Table, TableCell, TableLoading } from '@/components/Shared';
import { BAKERY_TABLE_HEADERS } from '@/constants';
import { HOME_WEEKLY_RANKING_HEADERS } from '@/constants/homeRanking';
import usePagination from '@/hooks/usePagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeCuration, changeForm, Curation } from '@/store/slices/homeFeed';
import { getBakeryTableData } from '@/utils/bakery';

type Props = {
  currIdx: number;
  closeModal: () => void;
};

// 전 주의 랭킹 조회
// 7/10 기준: 7/3 ~ 7/9 조회
export const WeeklyRankingModal = ({ currIdx, closeModal }: Props) => {
  // const dispatch = useAppDispatch();
  // const feedForm = useAppSelector(state => state.homeFeed.form);
  // const { pages, currPage, onChangeTotalPageCount, onGetPage, onGetNextPage, onGetPrevPage, onGetEndPage, onGetStartPage } = usePagination();
  //
  // const onClickRowItem = useCallback((row: TableCell) => {
  //   const { bakeryId, name } = row;
  //   const bakeryInfo: Curation['bakery'] = { bakeryId: bakeryId as number, bakeryName: name as string };
  //   dispatch(changeCuration({ currIdx, key: 'bakery', value: bakeryInfo }));
  // }, []);
  //
  // const { bakeriesQuery, bakeriesAlarmCountQuery } = useBakeries();
  // const { data, isLoading, isFetching } = bakeriesQuery({
  //   name: '', // searchParams.get('keyword') || '',
  //   page: currPage,
  //   filterBy: '', // searchParams.get('filter') || '',
  // });
  //
  // const exceptHeaderKey = ['alarm', 'createdAt', 'modifiedAt', 'status'];
  //
  // const bakeryData = getBakeryTableData(data?.bakeries || [], exceptHeaderKey);
  //
  // const changeTotalPageCount = (data?: { bakeries: BakeriesItemEntity[]; totalCount: number; totalPages: number }) => {
  //   if (data && data.totalPages) {
  //     onChangeTotalPageCount(data.totalPages);
  //   }
  // };
  //
  // useEffect(() => {
  //   data && changeTotalPageCount(data);
  // }, [data]);
  //
  // const havePrevData = !!data?.bakeries?.length;
  // const loading = isLoading || isFetching;
  //
  // const event = {
  //   hover: {
  //     on: true,
  //   },
  //   click: {
  //     on: true,
  //     fn: (row: TableCell) => {
  //       onClickRowItem(row);
  //       closeModal();
  //     },
  //   },
  // };
  //
  // return (
  //   <div>
  //     <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={HOME_WEEKLY_RANKING_HEADERS} />}>
  //       <Table headers={bakeryData.headers} rows={bakeryData.rows} event={event} />
  //     </Loading>
  //     <Pagination
  //       pages={pages}
  //       currPage={currPage}
  //       onClickPage={onGetPage}
  //       onClickNext={onGetNextPage}
  //       onClickPrev={onGetPrevPage}
  //       onClickEnd={onGetEndPage}
  //       onClickStart={onGetStartPage}
  //     />
  //   </div>
  // );
};
