import { SelectOption } from '@/components/Shared';
import { TableHeader } from '@/components/Shared/Table/types';
import { color } from '@/styles';

export const BAKERY_TABLE_HEADERS: TableHeader[] = [
  { key: 'bakeryId', name: '빵집 번호' },
  { key: 'name', name: '빵집 이름' },
  // { key: '-', name: '알람' } 나중에 추가
  { key: 'createdAt', name: '등록일' },
  { key: 'modifiedAt', name: '마지막 수정일' },
  { key: 'status', name: '상태' },
];

export const BAKERY_STATUS = {
  Unposting: 'UNPOSTING',
  Posting: 'POSTING',
};

export const BAKERY_STATUS_OPTIONS: SelectOption[] = [
  { name: '미게시', value: BAKERY_STATUS.Unposting, color: color.red },
  { name: '게시중', value: BAKERY_STATUS.Posting, color: color.green },
];

export type BakeryStatus = typeof BAKERY_STATUS[keyof typeof BAKERY_STATUS];
