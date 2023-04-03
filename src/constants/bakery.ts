import { SelectOption, TabItem } from '@/components/Shared';
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

export const BAKERY_REPORT_TAB_VALUE: Record<string, BakeryReportTabValue> = {
  Images: 'images',
  Products: 'products',
  Information: 'information',
};

export const BAKERY_REPORT_TAB: TabItem[] = [
  {
    name: '대표/메뉴 이미지',
    value: BAKERY_REPORT_TAB_VALUE.Images,
    isActive: true,
  },
  {
    name: '메뉴 제보',
    value: BAKERY_REPORT_TAB_VALUE.Products,
    isActive: false,
  },
  {
    name: '정보수정',
    value: BAKERY_REPORT_TAB_VALUE.Information,
    isActive: false,
  },
];

export const BAKERY_IMG_TAB_VALUE: Record<string, BakeryImgTabValue> = {
  MainImage: 'bakeryReportImage',
  MenuImage: 'productAddReportImage',
  ReviewImage: 'reviewImage',
};

export const BAKERY_IMG_TAB: TabItem[] = [
  {
    name: '대표 이미지',
    value: BAKERY_IMG_TAB_VALUE.MainImage,
    count: 0,
    isActive: true,
  },
  {
    name: '메뉴제보 이미지',
    value: BAKERY_IMG_TAB_VALUE.MenuImage,
    count: 0,
    isActive: false,
  },
  {
    name: '리뷰 이미지',
    value: BAKERY_IMG_TAB_VALUE.ReviewImage,
    count: 0,
    isActive: false,
  },
];

export type BakeryReportTabValue = 'images' | 'products' | 'information';
export type BakeryImgTabValue = 'bakeryReportImage' | 'productAddReportImage' | 'reviewImage';

export type BakeryStatus = (typeof BAKERY_STATUS)[keyof typeof BAKERY_STATUS];
