import React from 'react';
import { Table } from '@/components/Shared';
import type { TableProps } from '@/components/Shared';
import { PATH } from '@/constants';

const event = {
  hover: {
    on: true,
  },
  move: {
    on: true,
    basePath: PATH.BakeryReports,
  },
};

export const BakeryReportsTable = ({ headers, rows }: TableProps) => {
  return <Table headers={headers} rows={rows} event={event} />;
};
