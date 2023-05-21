import { SelectOption, TableHeader } from '@/components/Shared';
import { color } from '@/styles';

export const BAKERY_REPORT_TABLE_HEADERS: TableHeader[] = [
  { key: 'reportId', name: '제보 번호' },
  { key: 'userId', name: '제보자 ID' },
  { key: 'nickName', name: '제보자' },
  { key: 'bakeryName', name: '빵집 이름' },
  { key: 'location', name: '빵집 위치' },
  { key: 'content', name: '추천 이유' },
  { key: 'createdAt', name: '제보날짜' },
  { key: 'status', name: '처리상태' },
];

export const BAKERY_REPORT_STATUS = {
  BeforeReflect: 'BEFORE_REFLECT',
  NotReflect: 'NOT_REFLECT',
  Reflect: 'REFLECT',
};

export const BAKERY_REPORT_STATUS_OPTIONS: SelectOption[] = [
  { name: '검토전', value: BAKERY_REPORT_STATUS.BeforeReflect, color: color.primary500 },
  { name: '반영완료', value: BAKERY_REPORT_STATUS.Reflect, color: color.green },
  { name: '미반영', value: BAKERY_REPORT_STATUS.NotReflect, color: color.red },
];

export type BakeryReportStatus = (typeof BAKERY_REPORT_STATUS)[keyof typeof BAKERY_REPORT_STATUS];
