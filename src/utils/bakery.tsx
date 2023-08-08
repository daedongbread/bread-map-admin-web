import React from 'react';
import { BakeriesItemEntity, BakeryMenuEntity } from '@/apis';
import { StatusCell, TableCell } from '@/components/Shared';
import { AlarmCell } from '@/components/Shared/Table/Cell/AlarmCell';
import { BAKERY_ALARM_OPTIONS, BAKERY_MENU_TABLE_HEADERS, BAKERY_MENU_TYPES, BAKERY_STATUS_OPTIONS, BAKERY_TABLE_HEADERS } from '@/constants';
import { BakeryForm } from '@/store/slices/bakery';
import { formatTextToOAlarmArr, formatTextToOptionObj } from '@/utils/common';
import { FeedForm } from '@/store/slices/homeFeed';

export const validateBakeryForm = (form: BakeryForm) => {
  let isValid = true;

  if (!form.name || !form.address || !form.latitude || !form.longitude) {
    window.alert('빵집 이름 혹은 주소(위도, 경도)를 입력해주세요.');
    isValid = false;
  }

  if (form.address.length < 3 || form.address.length > 100) {
    window.alert('주소는 3자 이상, 100자 이하로 입력해주세요.');
    isValid = false;
  }

  if (form.productList && form.productList.length > 0) {
    form.productList.forEach(item => {
      if (!item.productName || !item.productType || !item.price) {
        window.confirm('메뉴명, 가격을 입력해주세요.');
        isValid = false;
      }
    });
  }
  return isValid;
};

// 빵집 관리 - 빵집 리스트 테이블
export const getBakeryTableData = (contents: BakeriesItemEntity[], exceptKey?: string[]) => {
  let rows: TableCell[] = [];
  if (contents.length > 0) {
    // status, alarms 수정
    rows = contents.map(item => {
      const status = formatTextToOptionObj({ constants: BAKERY_STATUS_OPTIONS, targetText: item.status });
      const { bakeryReportImageNum, productAddReportNum, bakeryUpdateReportNum, newReviewNum, ...rest } = item;
      const alarms = formatTextToOAlarmArr({
        constants: BAKERY_ALARM_OPTIONS,
        targetObj: { bakeryReportImageNum, productAddReportNum, bakeryUpdateReportNum, newReviewNum },
      });

      return {
        ...item,
        alarm: <AlarmCell alarms={alarms} />,
        status: <StatusCell color={status.color} text={status.text} />,
        address: `${item.address} ${item?.detailedAddress || ''}`,
      };
    });
  }

  let headers = BAKERY_TABLE_HEADERS;
  if (exceptKey) {
    exceptKey.forEach(key => {
      headers = headers.filter(h => h.key !== key);
    });
  }

  return { headers, rows };
};

export const validateHomeFeedForm = (form: FeedForm) => {
  let isValid = true;

  // if (!form.name || !form.address || !form.latitude || !form.longitude) {
  //   window.alert('빵집 이름 혹은 주소(위도, 경도)를 입력해주세요.');
  //   isValid = false;
  // }
  //
  // if (form.address.length < 3 || form.address.length > 100) {
  //   window.alert('주소는 3자 이상, 100자 이하로 입력해주세요.');
  //   isValid = false;
  // }
  //
  // if (form.productList && form.productList.length > 0) {
  //   form.productList.forEach(item => {
  //     if (!item.productName || !item.productType || !item.price) {
  //       window.confirm('메뉴명, 가격을 입력해주세요.');
  //       isValid = false;
  //     }
  //   });
  // }
  return isValid;
};

// 콘텐츠 관리 - 빵집 메뉴 조회 테이블
export const getBreadMenuTableData = (menus: BakeryMenuEntity[], exceptKey?: string[]) => {
  let rows: TableCell[] = [];
  if (menus.length > 0) {
    // status, alarms 수정
    rows = menus.map(item => {
      const productType = formatTextToOptionObj({ constants: BAKERY_MENU_TYPES, targetText: item.productType });

      return {
        ...item,
        productType: productType.text,
        price: `${item.price.toLocaleString()}원`,
      };
    });
  }

  let headers = BAKERY_MENU_TABLE_HEADERS;
  if (exceptKey) {
    exceptKey.forEach(key => {
      headers = headers.filter(h => h.key !== key);
    });
  }

  return { headers, rows };
};
