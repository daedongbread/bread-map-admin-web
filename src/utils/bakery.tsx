import { BakeryForm } from '@/store/slices/bakery';

export const validateForm = (form: BakeryForm) => {
  let validate = true;

  if (!form.name || !form.address || !form.latitude || !form.longitude) {
    window.alert('빵집 이름 혹은 주소(위도, 경도)를 입력해주세요.');
    validate = false;
  }

  if (form.productList && form.productList.length > 0) {
    form.productList.map(item => {
      if (!item.productName || !item.productType || !item.price) {
        window.confirm('메뉴명, 가격을 입력해주세요.');
        validate = false;
      }
    });
  }
  return validate;
};
