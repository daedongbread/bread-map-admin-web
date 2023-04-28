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
  Images: 'adminImage',
  Products: 'productAddReport',
  Information: 'bakeryUpdateReport',
};

export const BAKERY_REPORT_TAB: TabItem[] = [
  {
    name: '대표/메뉴 이미지',
    value: BAKERY_REPORT_TAB_VALUE.Images,
    isActive: true,
    isUpdated: false,
  },
  {
    name: '메뉴 제보',
    value: BAKERY_REPORT_TAB_VALUE.Products,
    isActive: false,
    isUpdated: false,
  },
  {
    name: '정보수정',
    value: BAKERY_REPORT_TAB_VALUE.Information,
    isActive: false,
    isUpdated: false,
  },
];

export const BAKERY_IMG_TAB_VALUE: Record<string, BakeryImgTabValue> = {
  MainImage: 'bakery-report-image',
  MenuImage: 'product-add-report-image',
  ReviewImage: 'review-image',
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

export type BakeryReportTabValue = 'adminImage' | 'productAddReport' | 'bakeryUpdateReport';
export type BakeryImgTabValue = 'bakery-report-image' | 'product-add-report-image' | 'review-image';

export type BakeryStatus = (typeof BAKERY_STATUS)[keyof typeof BAKERY_STATUS];
