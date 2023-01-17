import { SelectOption } from '@/components/Shared';
import { color } from '@/styles';

export const BAKERY_STATUS = {
  Unposting: 'UNPOSTING',
  Posting: 'POSTING',
};

export const BAKERY_STATUS_OPTIONS: SelectOption[] = [
  { name: '미게시', value: BAKERY_STATUS.Unposting, color: color.red },
  { name: '게시중', value: BAKERY_STATUS.Posting, color: color.green },
];

export type BakeryStatus = typeof BAKERY_STATUS[keyof typeof BAKERY_STATUS];
