// 빵집 리스트 - 테이블 정보
import { TableHeader } from '@/components/Shared';

// export const HOME_RANKING_TABLE_HEADERS: TableHeader[] = [
//   { key: 'feedId', name: '번호' },
//   { key: 'category', name: '카테고리' },
//   { key: 'feedTitle', name: '제목' },
//   { key: 'authorName', name: '작성자' },
//   { key: 'createdAt', name: '등록일' },
//   { key: 'status', name: '상태' },
// ];

export const HOME_WEEKLY_RANKING_HEADERS: TableHeader[] = [
  { key: 'bakeryName', name: '빵집명' },
  { key: 'address', name: '주소' },
  { key: 'viewCount', name: '조회수' },
  { key: 'flagCount', name: '깃발' },
  { key: 'score', name: '스코어' },
];

// export const getHomeRankingTableHeaders = (data: GetHomeRankingResponse) => {
//   const headers = data.dateList.map(date => {
//     const dates = date.split('-');
//     const dateName = `${dates[1]}/${date[2]}`;
//     return { key: date, name: dateName };
//   });
//   return headers;
// };
