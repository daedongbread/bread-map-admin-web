import React from 'react';
import { BakeryReportsItemEntity } from '@/apis';
import type { ContentsRow } from '@/components/BakeryReportDetail';
import { StatusCell, TableCell } from '@/components/Shared';
import { BAKERY_REPORT_STATUS_OPTIONS, BAKERY_REPORT_TABLE_HEADERS } from '@/constants';
import { formatTextToOptionObj } from '@/utils/common';

export const extractContentsWithType = (bakeryReport: BakeryReportsItemEntity): ContentsRow[] => {
  const contents: ContentsRow[] = [
    { label: '제보자', text: bakeryReport.nickName, type: 'input' },
    { label: '빵집 이름', text: bakeryReport.bakeryName, type: 'input' },
    { label: '빵집 위치', text: bakeryReport.location, type: 'input' },
    { label: '추천 이유', text: bakeryReport.content, type: 'textarea' },
  ];
  return contents;
};

export const getBakeryReportTableData = (contents: BakeryReportsItemEntity[]) => {
  let rows: TableCell[] = [];
  if (contents.length > 0) {
    rows = contents.map(item => {
      const status = formatTextToOptionObj({ constants: BAKERY_REPORT_STATUS_OPTIONS, targetText: item.status });
      const { userId, ...exceptUserIdItem } = item;
      return {
        ...item,
        status: <StatusCell color={status.color} text={status.text} />,
      };
    });
  }

  return { headers: BAKERY_REPORT_TABLE_HEADERS, rows };
};
