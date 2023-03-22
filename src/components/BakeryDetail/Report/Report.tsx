import React from 'react';
import { ImageEditView } from '@/components/BakeryDetail/Report/ImageEditView';
import { InformationEditView } from '@/components/BakeryDetail/Report/InformationEditView';
import { MenuEditView } from '@/components/BakeryDetail/Report/MenuEditView';
import { BAKERY_REPORT_TAB_VALUE, BakeryReportTabValue } from '@/constants';

type Props = {
  type: BakeryReportTabValue;
};

export const Report = ({ type }: Props) => {
  switch (type) {
    case BAKERY_REPORT_TAB_VALUE.Images:
      return (
        <div>
          <ImageEditView />
        </div>
      );
    case BAKERY_REPORT_TAB_VALUE.Products:
      return (
        <div>
          <MenuEditView />
        </div>
      );
    case BAKERY_REPORT_TAB_VALUE.Information:
      return (
        <div>
          <InformationEditView />
        </div>
      );
    default:
      throw new Error('ReportContentSection에서 제대로된 컴포넌트를 불러오지 못했습니다.');
  }
};
