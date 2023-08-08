// 콘텐츠 관리 - 게시 상테
import { SelectOption } from '@/components/Shared';
import { color } from '@/styles';

export const HOME_FEED_STATUS = {
  Inactivated: 'INACTIVATED',
  Posting: 'POSTING',
};

export const HOME_FEED_STATUS_OPTIONS: SelectOption[] = [
  { name: '미게시', value: HOME_FEED_STATUS.Inactivated, color: color.red },
  { name: '게시중', value: HOME_FEED_STATUS.Posting, color: color.green },
];
