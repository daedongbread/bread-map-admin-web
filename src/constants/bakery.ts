import { SelectOption, TabItem } from '@/components/Shared';
import { TableHeader } from '@/components/Shared/Table/types';
import { color } from '@/styles';

// 빵집 리스트 - 테이블 정보
export const BAKERY_TABLE_HEADERS: TableHeader[] = [
  { key: 'bakeryId', name: '빵집 번호' },
  { key: 'name', name: '빵집 이름' },
  { key: 'alarm', name: '알람' },
  { key: 'createdAt', name: '등록일' },
  { key: 'modifiedAt', name: '마지막 수정일' },
  { key: 'status', name: '상태' },
];

// 빵집 게시 상태
export const BAKERY_STATUS = {
  Unposting: 'UNPOSTING',
  Posting: 'POSTING',
};

export const BAKERY_STATUS_OPTIONS: SelectOption[] = [
  { name: '미게시', value: BAKERY_STATUS.Unposting, color: color.red },
  { name: '게시중', value: BAKERY_STATUS.Posting, color: color.green },
];

// 빵집 리스트 알람
export const BAKERY_ALARM_VALUE = {
  NewMainImage: 'bakeryReportImageNum',
  NewMenu: 'productAddReportNum',
  NewInformation: 'bakeryUpdateReportNum',
  NewReview: 'newReviewNum',
};

export const BAKERY_ALARM_OPTIONS: (SelectOption & { bgColor: string })[] = [
  { name: '대표 이미지', value: BAKERY_ALARM_VALUE.NewMainImage, color: color.blue800, bgColor: color.blue100 },
  { name: '메뉴 제보', value: BAKERY_ALARM_VALUE.NewMenu, color: color.green800, bgColor: color.green100 },
  { name: '정보 수정', value: BAKERY_ALARM_VALUE.NewInformation, color: color.red800, bgColor: color.red200 },
  { name: '신규 리뷰', value: BAKERY_ALARM_VALUE.NewReview, color: color.blueGray, bgColor: color.pink },
];

// 빵집 리스트 > 조회 필터
export const BAKERY_FILTER_VALUE: Record<string, BakeryFilterValue> = {
  NewMainImage: 'bakery-report-image',
  NewMenu: 'product-add-report',
  NewInformation: 'bakery-update-report',
  NewReview: 'new-review',
};

export const BAKERY_FILTER = [
  {
    name: '대표 이미지',
    value: BAKERY_FILTER_VALUE.NewMainImage,
  },
  {
    name: '메뉴 제보',
    value: BAKERY_FILTER_VALUE.NewMenu,
  },
  {
    name: '정보 수정',
    value: BAKERY_FILTER_VALUE.NewInformation,
  },
  {
    name: '신규 리뷰',
    value: BAKERY_FILTER_VALUE.NewReview,
  },
];

// 빵집 상세 > 빵집 제보 탭 (등록된 빵집인 경우에만 사용)
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

// 빵집 상세 > 빵집 제보 탭 > 이미지 탭
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

export type BakeryFilterValue = 'bakery-report-image' | 'product-add-report' | 'bakery-update-report' | 'new-review';
export type BakeryReportTabValue = 'adminImage' | 'productAddReport' | 'bakeryUpdateReport';
export type BakeryImgTabValue = 'bakery-report-image' | 'product-add-report-image' | 'review-image';

export type BakeryStatus = (typeof BAKERY_STATUS)[keyof typeof BAKERY_STATUS];
