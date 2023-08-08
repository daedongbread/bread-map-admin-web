import React, { useCallback } from 'react';
import { useBakery } from '@/apis';
import { Loading, Table, TableCell, TableLoading } from '@/components/Shared';
import { BAKERY_MENU_TABLE_HEADERS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeCuration, Curation } from '@/store/slices/homeFeed';
import { getBreadMenuTableData } from '@/utils/bakery';

type Props = {
  currIdx: number;
  closeModal: () => void;
};

export const BakeryMenuModal = ({ currIdx, closeModal }: Props) => {
  const feedForm = useAppSelector(state => state.homeFeed.form);
  const { curations } = feedForm;

  const bakeryId = curations[currIdx]?.bakery?.bakeryId;
  if (typeof bakeryId === 'undefined' || isNaN(bakeryId)) {
    throw new Error(`bakeryId is required, current: ${bakeryId}`);
  }

  const dispatch = useAppDispatch();
  const onClickRowItem = useCallback((row: TableCell) => {
    const { productId, productName } = row;
    const productInfo: Curation['bread'] = { productId: productId as number, productName: productName as string };
    dispatch(changeCuration({ currIdx, key: 'bread', value: productInfo }));
  }, []);

  const {
    bakeryQuery: { data, isLoading, isFetching },
  } = useBakery({ bakeryId });

  const bakeryMenuData = getBreadMenuTableData(data?.productList || []);

  const havePrevData = !!data?.productList?.length;
  const loading = isLoading || isFetching;

  const event = {
    hover: {
      on: true,
    },
    click: {
      on: true,
      fn: (row: TableCell) => {
        onClickRowItem(row);
        closeModal();
      },
    },
  };

  return (
    <div>
      <Loading havePrevData={havePrevData} isLoading={loading} loadingComponent={<TableLoading headers={BAKERY_MENU_TABLE_HEADERS} />}>
        <Table headers={bakeryMenuData.headers} rows={bakeryMenuData.rows} event={event} />
      </Loading>
    </div>
  );
};
