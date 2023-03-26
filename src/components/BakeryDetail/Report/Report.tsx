import React from 'react';
import { ImageEditView } from '@/components/BakeryDetail/Report/ImageEditView';
import { InformationEditView } from '@/components/BakeryDetail/Report/InformationEditView';
import { MenuEditView } from '@/components/BakeryDetail/Report/MenuEditView';
import { BAKERY_REPORT_TAB_VALUE } from '@/constants';
import { ReportTabTitle } from '@/components/BakeryDetail/Report/ReportTabTitle';
import { TabItem } from '@/components/Shared';

type Props = {
  tabItem: TabItem;
};

export const Report = ({ tabItem }: Props) => {
  switch (tabItem.value) {
    case BAKERY_REPORT_TAB_VALUE.Images:
      return (
        <div>
          <ImageEditView />
        </div>
      );
    case BAKERY_REPORT_TAB_VALUE.Products:
      return (
        <div>
          <ReportTabTitle title={tabItem.name} count={tabItem.count ?? 0} />
          <MenuEditView />
        </div>
      );
    case BAKERY_REPORT_TAB_VALUE.Information:
      return (
        <div>
          <ReportTabTitle title={tabItem.name} count={tabItem.count ?? 0} />
          <InformationEditView />
        </div>
      );
    default:
      throw new Error('ReportContentSection에서 제대로된 컴포넌트를 불러오지 못했습니다.');
  }
};
