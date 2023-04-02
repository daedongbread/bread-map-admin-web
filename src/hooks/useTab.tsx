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

  return { tabs, selectTab, setTabCount };
};

export default useTab;
