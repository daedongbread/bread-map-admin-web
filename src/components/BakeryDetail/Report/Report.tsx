import React from 'react';
import { ImageEditView } from '@/components/BakeryDetail/Report/ImageEditView';
import { InformationReportView } from '@/components/BakeryDetail/Report/InformationReportView';
import { MenuReportView } from '@/components/BakeryDetail/Report/MenuReportView';
import { NewReviewView } from '@/components/BakeryDetail/Report/NewReviewView';
import { TabItem } from '@/components/Shared';
import { BAKERY_REPORT_TAB_VALUE } from '@/constants';

type Props = {
  bakeryId: number;
  tabItem: TabItem;
};

export const Report = ({ bakeryId, tabItem }: Props) => {
  switch (tabItem.value) {
    case BAKERY_REPORT_TAB_VALUE.Images:
      return <ImageEditView bakeryId={bakeryId} />;
    case BAKERY_REPORT_TAB_VALUE.Products:
      return <MenuReportView bakeryId={bakeryId} />;
    case BAKERY_REPORT_TAB_VALUE.Information:
      return <InformationReportView bakeryId={bakeryId} />;
    case BAKERY_REPORT_TAB_VALUE.Reviews:
      return <NewReviewView bakeryId={bakeryId} />;
    default:
      throw new Error('ReportContentSection에서 제대로된 컴포넌트를 불러오지 못했습니다.');
  }
};
