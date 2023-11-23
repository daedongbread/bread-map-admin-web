import React from 'react';

export type TableHeader = { key: string; name: string };

export type TableCell = Record<string, React.ReactNode | string | number>;

export type TableClickEvent = (() => void) | ((row: TableCell) => void);

export type TableProps = {
  headers: {
    key: string;
    name: string;
  }[];
  rows: TableCell[];
  hiddenHeader?: boolean;
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
    headerClick?: {
      on: boolean;
      fn: (header: { key: string; name: string }) => void;
    };
    headerStyle?: {
      headerNames: string[];
    };
    draggable?: {
      on: boolean;
      dragEndFn: (dropResult: { source: { index: number }; destination: { index: number } }) => void;
    };
  };
};
