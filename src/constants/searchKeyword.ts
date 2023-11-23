import { TableHeader } from '@/components/Shared';

export const SEARCH_KEYWORD_COUNT_TABLE_HEADERS: TableHeader[] = [
  { key: 'id', name: '' },
  { key: 'keyword', name: '검색어' },
  { key: 'threeMonthCount', name: '최근 3개월 검색량' },
  { key: 'oneMonthCount', name: '최근 1개월 검색량' },
  { key: 'oneWeekCount', name: '최근 1주일 검색량' },
];

export const SEARCH_KEYWORD_RANK_TABLE_HEADERS: TableHeader[] = [
  { key: 'icon', name: '아이콘' },
  { key: 'keyword', name: '검색어' },
  { key: 'remove', name: '삭제' },
];
