import React from 'react';

export type TableCell = Record<string, React.ReactNode | string | number>;

export type TableProps = {
  headers: TableCell[];
  rows: TableCell[];
  event?: {
    hover?: {
      on: boolean;
    };
    move?: {
      on: boolean;
      basePath: string;
    };
  };
};
