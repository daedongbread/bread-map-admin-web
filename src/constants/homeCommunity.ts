import { TableHeader } from '@/components/Shared';

export const COMMUNITY_TABLE_HEADERS: TableHeader[] = [
  { key: 'managerId', name: 'NO.' },
  { key: 'nickname', name: '작성자' },
  { key: 'title', name: '제목' },
  { key: 'createdAt', name: '작성 일자' },
  { key: 'isFixed', name: '고정됨' },
  { key: 'isPosted', name: '처리상태' },
  { key: 'isCarousel', name: '캐러셀' },
];
