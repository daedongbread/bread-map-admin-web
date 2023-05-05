import React from 'react';
import { ImageEditView } from '@/components/BakeryDetail/Report/ImageEditView';
import { InformationEditView } from '@/components/BakeryDetail/Report/InformationEditView';
import { MenuEditView } from '@/components/BakeryDetail/Report/MenuEditView';
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
      return <MenuEditView bakeryId={bakeryId} />;
    case BAKERY_REPORT_TAB_VALUE.Information:
      return <InformationEditView bakeryId={bakeryId} />;
    case BAKERY_REPORT_TAB_VALUE.Reviews:
      return <NewReviewView bakeryId={bakeryId} />;
    default:
      throw new Error('ReportContentSection에서 제대로된 컴포넌트를 불러오지 못했습니다.');
  }
};
