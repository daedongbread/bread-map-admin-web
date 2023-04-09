import React from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

export type TabItem = {
  name: string;
  value: string;
  count?: number;
  isActive: boolean;
  isUpdated?: boolean;
};

type Props = {
  tab: TabItem;
  type: 'plain' | 'outline';
  onSelectReportTab: (tab: TabItem) => void;
  updatedStyle?: 'dot';
};

export const Tab = ({ tab, type, onSelectReportTab, updatedStyle }: Props) => {
  const matchedStyle = Object.entries(TAB_STYLE).find(([key]) => key === type);
  if (!matchedStyle) {
    throw new Error('Tab 컴포넌트 스타일이 없습니다.');
  }
  const { fontColor, borderColor, countColor, padding } = matchedStyle[1];

  return (
    <CustomTab
      fontColor={fontColor}
      borderColor={borderColor}
      countColor={countColor}
      padding={padding}
      isActive={tab.isActive}
      updatedStyle={updatedStyle}
      isUpdated={tab.isUpdated}
      onClick={() => onSelectReportTab(tab)}
    >
      <span>{tab.name}</span>
      {tab.count && <span className="count">{tab.count}</span>}
    </CustomTab>
  );
};

type TabStyles = {
  fontColor: string;
  borderColor?: string;
  countColor?: string;
  updatedStyle?: 'dot';
  padding?: string;
};

const TAB_STYLE: { [key: string]: TabStyles } = {
  plain: {
    fontColor: color.gray700,
    countColor: color.primary500,
  },
  outline: {
    fontColor: color.primary500,
    borderColor: color.primary500,
    updatedStyle: 'dot',
    padding: ' 1rem 2rem',
  },
};

const CustomTab = styled.button<TabStyles & { isActive: boolean; updatedStyle?: string; isUpdated?: boolean }>`
  position: relative;
  display: inline-block;
  padding: ${({ padding }) => padding};
  margin-right: 2rem;
  font-size: 1.4rem;
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
  color: ${({ isActive, fontColor, theme }) => (isActive ? fontColor : theme.color.gray400)};
  border: ${({ isActive, borderColor, theme }) =>
    isActive && borderColor ? `1px solid ${borderColor}` : !isActive && borderColor ? `1px solid ${theme.color.gray400}` : 'none'};
  border-radius: 3rem;

  .count {
    margin-left: 3px;
    color: ${({ theme, isActive }) => (isActive ? theme.color.primary500 : theme.color.gray400)};
  }

  &:after {
    opacity: ${({ updatedStyle }) => (updatedStyle ? 1 : 0)};
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${({ theme, isUpdated }) => (isUpdated ? theme.color.primary500 : 'none')};
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
`;
