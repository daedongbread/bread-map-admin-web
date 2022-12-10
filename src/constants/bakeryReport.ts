import { SelectOption } from '@/components/Shared';
import { color } from '@/styles';

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

export type BakeryReportStatus = typeof BAKERY_REPORT_STATUS[keyof typeof BAKERY_REPORT_STATUS];
