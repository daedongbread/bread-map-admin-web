import React, { useState } from 'react';
import { TabItem } from '@/components/Shared';

const useTab = ({ tabData }: { tabData: TabItem[] }) => {
  const [tabs, setTabs] = useState(tabData);

  const selectTab = (tab: TabItem) => {
    setTabs(prev =>
      prev.map(item => {
        return item.name === tab.name ? { ...item, isActive: true } : { ...item, isActive: false };
      })
    );
  };

  const setTabCount = (tab: TabItem, count: number) => {
    setTabs(prev =>
      prev.map(item => {
        return item.name === tab.name ? { ...item, count } : item;
      })
    );
  };

  const setUpdateStatusTab = (data: Record<string, boolean>) => {
    setTabs(prev => prev.map(tab => ({ ...tab, isUpdated: data[`${tab.value}IsNew`] })));
  };

  return { tabs, selectTab, setTabCount, setUpdateStatusTab };
};

export default useTab;
