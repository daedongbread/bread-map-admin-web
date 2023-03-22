import React from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

export type TabItem = {
  name: string;
  value: string;
  count?: number;
  isActive: boolean;
};

type Props = {
  tab: TabItem;
  type: 'plain' | 'outline';
  onSelectReportTab: (tab: TabItem) => void;
};

export const Tab = ({ tab, type, onSelectReportTab }: Props) => {
  const matchedStyle = Object.entries(TAB_STYLE).find(([key]) => key === type);
  if (!matchedStyle) {
    throw new Error('Tab 컴포넌트 스타일이 없습니다.');
  }
  const { fontColor, borderColor, countColor } = matchedStyle[1];

  return (
    <CustomTab fontColor={fontColor} borderColor={borderColor} countColor={countColor} isActive={tab.isActive} onClick={() => onSelectReportTab(tab)}>
      <span>{tab.name}</span>
      {tab.count && <span>{tab.count}</span>}
    </CustomTab>
  );
};

type TabStyles = {
  fontColor: string;
  borderColor?: string;
  countColor?: string;
};

const TAB_STYLE: { [key: string]: TabStyles } = {
  plain: {
    fontColor: color.gray900,
    countColor: color.primary500,
  },
  outline: {
    fontColor: color.primary500,
    borderColor: color.primary500,
  },
};

const CustomTab = styled.button<TabStyles & { isActive: boolean }>`
  display: inline-block;
  padding: 1rem 2rem;
  margin-right: 2rem;
  font-size: 1.4rem;
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
  color: ${({ isActive, fontColor, theme }) => (isActive ? fontColor : theme.color.gray400)};
  border: ${({ isActive, borderColor, theme }) =>
    isActive && borderColor ? `1px solid ${borderColor}` : !isActive && borderColor ? `1px solid ${theme.color.gray400}` : 'none'};
  border-radius: 3rem;
  &:not(:first-of-type) {
  }
`;
