import { BakeryForm } from '@/store/slices/bakery';

export const validateForm = (form: BakeryForm) => {
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
