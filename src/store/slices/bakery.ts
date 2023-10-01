import { BakeryDetailBaseEntity, BakerySns, BakeryStatus } from '@/apis';
import { SnsLink } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { SelectOption } from '@/components/Shared';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type BakeryForm = Omit<BakeryDetailBaseEntity, 'latitude' | 'longitude'> & {
  latitude: string;
  longitude: string;
  productList: ProductItem[];
  status: BakeryStatus | null;
  facilityInfoList: string[];
};

export type ProductItem = {
  productId?: number;
  productType: string;
  productName: string;
  price: number;
  image: string | null;
};

const initialProductItem = {
  // productId: 0, 생성시에만 있음
  productType: 'BREAD',
  productName: '',
  price: 0,
  image: '', // 조회시에만 이미지 여기에 들어옴
};

const initialBakeryForm: BakeryForm = {
  name: '',
  pioneerId: null,
  pioneerNickName: '',
  reportId: null,
  images: [],
  address: '',
  detailedAddress: '',
  latitude: '',
  longitude: '',
  hours: '',
  newBreadTime: '',
  checkPoint: '',
  instagramURL: '',
  facebookURL: '',
  blogURL: '',
  websiteURL: '',
  phoneNumber: '',
  facilityInfoList: [],
  productList: [],
  status: 'UNPOSTING',
};

const initialBakeryLinks: SnsLink[] = [
  { key: 'websiteURL', value: '' },
  { key: 'instagramURL', value: '' },
  { key: 'facebookURL', value: '' },
  { key: 'blogURL', value: '' },
];

export type BakeryFormChangeKey = keyof BakeryDetailBaseEntity;

export type PreviewImageType = 'image' | 'menu';

export type ImageUploaderInfo = {
  url: string;
  type: PreviewImageType;
  name: string;
  menuId?: number;
  currMenuIdx?: number;
};

interface BakeryState {
  loading: boolean;
  error: boolean;
  form: BakeryForm;
  formLinks: SnsLink[];
  openedSnsLinkIdx: number | null; // TODO: opened selectbox id로 하나만 가지고있으면 좋을듯?
  openedMenuTypeIdx: number | null;
  currentImageUploader: ImageUploaderInfo | null;
}

const initialState: BakeryState = {
  loading: false,
  error: false,
  form: initialBakeryForm,
  formLinks: initialBakeryLinks,
  openedSnsLinkIdx: null,
  openedMenuTypeIdx: null,
  currentImageUploader: null,
};

const bakerySlice = createSlice({
  name: 'bakery',
  initialState,
  reducers: {
    changeForm(state, action: PayloadAction<{ name: string; value: string | string[] }>) {
      const { name, value } = action.payload;

      state.form = {
        ...state.form,
        [name]: value,
      };
    },
    initializeForm(state) {
      state.form = initialBakeryForm;
      state.formLinks = initialBakeryLinks;
    },
    setForm(state, action: PayloadAction<{ form: BakeryForm }>) {
      const { form } = action.payload;
      state.form = form;
    },
    changeBakeryStatus(state, action: PayloadAction<{ status: string }>) {
      const { status } = action.payload;
      state.form.status = status as BakeryStatus;
    },
    changeBakeryImg(state, action: PayloadAction<{ imgPreview: string }>) {
      const { imgPreview } = action.payload;
      if (!state.form.images) {
        state.form.images = [];
      }
      state.form.images[0] = imgPreview;
    },
    closeAllLinkOption(state) {
      // state.openedSelectBoxId = null;
      state.openedSnsLinkIdx = null;
    },
    toggleLinkOption(state, action: PayloadAction<{ currIdx: number }>) {
      const { openedSnsLinkIdx } = state;
      const { currIdx } = action.payload;
      state.openedSnsLinkIdx = currIdx === openedSnsLinkIdx ? null : currIdx;
    },
    selectLinkOption(
      state,
      action: PayloadAction<{
        currIdx: number;
        optionValue: SelectOption['value'];
        linkValue: string;
      }>
    ) {
      // 중복 선택 안되도록 구현필요
      const { currIdx, optionValue, linkValue } = action.payload;
      const target = state.formLinks[currIdx];
      state.formLinks.splice(currIdx, 1, { ...target, key: optionValue as BakerySns });

      const updatedLinks: { [name: string]: string } = {};
      state.formLinks.forEach(link => {
        updatedLinks[optionValue] = linkValue;
      });
      state.form = { ...state.form, ...updatedLinks };
    },
    changeLinkValue(
      state,
      action: PayloadAction<{
        currIdx: number;
        optionValue: SelectOption['value'];
        linkValue: string;
      }>
    ) {
      const { currIdx, optionValue, linkValue } = action.payload;
      const target = state.formLinks[currIdx];
      state.formLinks.splice(currIdx, 1, { ...target, value: linkValue });

      const updatedLinks: { [key: string]: string } = {};
      state.formLinks.forEach(link => {
        updatedLinks[optionValue] = linkValue;
      });
      state.form = { ...state.form, ...updatedLinks };
    },
    setLinks(state, action: PayloadAction<{ links: SnsLink[] }>) {
      const { links } = action.payload;
      state.formLinks = links;
    },
    removeLink(state, action: PayloadAction<{ currIdx: number }>) {
      const { currIdx } = action.payload;
      state.formLinks.splice(currIdx, 1);
    },
    addLink(state) {
      state.formLinks.push({ key: 'blogURL', value: '' });
    },
    toggleFacility(state, action: PayloadAction<{ value: string }>) {
      const { value } = action.payload;
      const list = state.form.facilityInfoList;
      list.includes(value) ? (state.form.facilityInfoList = list.filter(item => item !== value)) : state.form.facilityInfoList.push(value);
    },
    closeMenuTypeOption(state) {
      state.openedMenuTypeIdx = null;
    },
    toggleMenuTypeOption(state, action: PayloadAction<{ currIdx: number }>) {
      const { openedMenuTypeIdx } = state;
      const { currIdx } = action.payload;
      state.openedMenuTypeIdx = currIdx === openedMenuTypeIdx ? null : currIdx;
    },
    selectMenuTypeOption(state, action: PayloadAction<{ currIdx: number; optionValue: SelectOption['value'] }>) {
      // 동작이 되는가?
      const { currIdx, optionValue } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, productType: optionValue as string });
    },
    changeMenuInput(state, action: PayloadAction<{ currIdx: number; name: string; value: string }>) {
      const { currIdx, name, value } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, [name]: value });
    },
    removeMenu(state, action: PayloadAction<{ currIdx: number }>) {
      const { currIdx } = action.payload;
      state.form.productList = state.form.productList.filter((meu, idx) => idx !== currIdx);
    },
    addMenu(state) {
      state.form.productList.push(initialProductItem);
    },
    changeMenuImg(state, action: PayloadAction<{ currIdx: number; imgPreview: string }>) {
      const { currIdx, imgPreview } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, image: imgPreview });
    },
    changeCurrentImageUploader(state, action: PayloadAction<ImageUploaderInfo | null>) {
      state.currentImageUploader = action.payload;
    },
  },
});

export default bakerySlice.reducer;
export const {
  changeForm,
  initializeForm,
  setForm,
  changeBakeryStatus,
  changeBakeryImg,
  closeAllLinkOption,
  toggleLinkOption,
  selectLinkOption,
  changeLinkValue,
  setLinks,
  removeLink,
  addLink,
  toggleFacility,
  closeMenuTypeOption,
  toggleMenuTypeOption,
  selectMenuTypeOption,
  changeMenuInput,
  removeMenu,
  addMenu,
  changeMenuImg,
  changeCurrentImageUploader,
} = bakerySlice.actions;
