import React from 'react';
import { BakeriesItemEntity, BakeryDetailEntity, BakeryMenuEntity } from '@/apis';
import { Link } from '@/components/BakeryDetail/LinkForm';
import { BakeryForm, ProductItem } from '@/store/slices/bakery';
import { urlToBlob } from '@/utils/common';

const getUpdateBreadImgFile = async ({ formBread, originBread }: { formBread: ProductItem; originBread?: BakeryMenuEntity }) => {
  const emptyFile = new Blob([''], { type: 'image/png' });
  const file = formBread.image ? await urlToBlob(formBread.image, formBread.productName) : originBread && originBread.image ? originBread.image : emptyFile;
  return file;
};

export const makeBakeryPayload = async ({ origin, form, formLinks }: { origin?: BakeryDetailEntity; form: BakeryForm; formLinks: Link[] }) => {
  const formData = new FormData();

  const linkPayload: { [key: string]: string } = {};
  formLinks.forEach(link => {
    linkPayload[link.key] = link.value;
  });

  // ** make request data
  const { image, productList, ...requestData } = form;
  const productListExceptImage = productList.map(item => {
    const { image, ...rest } = item;
    return { ...rest };
  });
  const request = new Blob([JSON.stringify({ ...requestData, productList: productListExceptImage, ...linkPayload })], { type: 'application/json' });
  formData.append('request', request);

  // ** make productList (image) data
  // @ 이미지들은 원본데이터(original)와 달라졌을 경우만 아래로직들 실행하기.
  // @ 메뉴들의 순서가 바뀔수있으므로, 빵 메뉴들을 순회해서 target을 찾는다.
  // @ if 빵메뉴가 없으면 append X (빵메뉴가 없을때 productImageList = [] 로 보내면 에러가 난다.)

  if (form.productList.length > 0) {
    if (origin) {
      // 수정시
      for (const formBread of form.productList) {
        const originBread = origin.productList.find(item => item.productId === formBread.productId);
        const file = await getUpdateBreadImgFile({ formBread, originBread });
        formData.append('productImageList', file);
      }
    } else {
      // 생성시
      for (const formBread of form.productList) {
        const emptyBlob = new Blob([''], { type: 'image/png' });
        const blob: Blob = formBread.image ? await urlToBlob(formBread.image as string, formBread.productName) : emptyBlob;
        formData.append('productImageList', blob);
      }
    }
  }

  // ** make bakeryImage data **
  // @ 빵집 이미지없으면 append X
  if (form.image) {
    const file = origin && form.image === origin.image ? origin.name : await urlToBlob(form.image, form.name);
    formData.append('bakeryImage', file);
  }

  const payload = await formData;
  return payload;
};
