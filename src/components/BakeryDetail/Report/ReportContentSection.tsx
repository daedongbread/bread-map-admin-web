import React from 'react';
import { BAKERY_REPORT_TAB_VALUE, BakeryReportTabValue } from '@/constants';

type Props = {
  type: BakeryReportTabValue;
};

export const ReportContentSection = ({ type }: Props) => {
  switch (type) {
    case BAKERY_REPORT_TAB_VALUE.Images:
      return <div>대표/메뉴 컴포넌트</div>;
    case BAKERY_REPORT_TAB_VALUE.Products:
      return <div>메뉴 제보 컴포넌트</div>;
    case BAKERY_REPORT_TAB_VALUE.Information:
      return <div>정보수정 컴포넌트</div>;
    default:
      throw new Error('ReportContentSection에서 제대로된 컴포넌트를 불러오지 못했습니다.');
  }
};
