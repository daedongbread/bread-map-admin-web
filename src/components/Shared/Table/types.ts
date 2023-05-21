import React from 'react';

export type TableHeader = { key: string; name: string };

export type TableCell = Record<string, React.ReactNode | string | number>;

export type TableClickEvent = (() => void) | ((row: TableCell) => void);

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
    click?: {
      on: boolean;
      fn: TableClickEvent;
    };
  };
};
