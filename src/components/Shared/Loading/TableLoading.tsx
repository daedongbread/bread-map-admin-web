import React, { useCallback } from 'react';
import { SkeletonCell, Table, TableCell } from '@/components/Shared';
import { TableHeader } from '@/components/Shared/Table/types';

export const TableLoading = ({ headers }: { headers: TableHeader[] }) => {
  const getRows = useCallback(
    (headers: TableHeader[]) => {
      const obj: TableCell = {};
      headers.map(header => {
        obj[header.key] = <SkeletonCell />;
      });
      const rows: TableCell[] = Array(20).fill(obj);
      return rows;
    },
    [headers]
  );

  const rows = getRows(headers);

  return <Table headers={headers} rows={rows} />;
};
