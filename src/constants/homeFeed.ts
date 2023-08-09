import { SelectOption, TableHeader } from '@/components/Shared';
import { color } from '@/styles';

// 빵집 리스트 - 테이블 정보
export const HOME_FEED_TABLE_HEADERS: TableHeader[] = [
  { key: 'feedId', name: '번호' },
  { key: 'category', name: '카테고리' },
  { key: 'feedTitle', name: '제목' },
  { key: 'authorName', name: '작성자' },
  { key: 'createdAt', name: '등록일' },
  { key: 'status', name: '상태' },
];

// 홈피드 카테고리
export const HOME_FEED_CATEGORY_VALUE = {
  MonthlyTrendBakery: 1,
  RecommendBakery: 2,
};

// 빵집 게시 상태
export const HOME_FEED_STATUS = {
  Unposting: '미게시',
  Posting: '게시중',
};

export const HOME_FEED_STATUS_OPTIONS: SelectOption[] = [
  { name: HOME_FEED_STATUS.Unposting, value: HOME_FEED_STATUS.Unposting, color: color.red },
  { name: HOME_FEED_STATUS.Posting, value: HOME_FEED_STATUS.Posting, color: color.green },
];

export const HOME_FEED_CATEGORY_OPTIONS: (SelectOption & { bgColor: string })[] = [
  // TODO: 나중에 api로 불러오기
  { name: '월별 트렌드 빵집', value: HOME_FEED_CATEGORY_VALUE.MonthlyTrendBakery, color: color.blue800, bgColor: color.blue100 },
  { name: '추천 빵집', value: HOME_FEED_CATEGORY_VALUE.RecommendBakery, color: color.green800, bgColor: color.green100 },
];

export const TIME_OPTIONS: SelectOption[] = [
  { name: '오전 12시 (밤)', value: '00:00:00' },
  { name: '오전 7시', value: '07:00:00' },
  { name: '오전 8시', value: '08:00:00' },
  { name: '오전 9시', value: '09:00:00' },
  { name: '오전 10시', value: '10:00:00' },
  { name: '오전 11시', value: '11:00:00' },
  { name: '오후 12시 (낮)', value: '12:00:00' },
  { name: '오후 1시', value: '13:00:00' },
  { name: '오후 2시', value: '14:00:00' },
  { name: '오후 3시', value: '15:00:00' },
  { name: '오후 4시', value: '16:00:00' },
  { name: '오후 5시', value: '17:00:00' },
  { name: '오후 6시', value: '18:00:00' },
  { name: '오후 7시', value: '19:00:00' },
  { name: '오후 8시', value: '20:00:00' },
  { name: '오후 9시', value: '21:00:00' },
  { name: '오후 10시', value: '22:00:00' },
  { name: '오후 11시', value: '23:00:00' },
];
