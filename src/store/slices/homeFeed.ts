import { dashDateFormat } from '@/utils/date';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type Curation = {
  bakery: {
    bakeryId?: number; // 초기에는 없음
    bakeryName: string;
  };
  bread: {
    productId?: number;
    productName: string;
  };
  reason: string;
};

export type HomeFeedStatus = 'INACTIVATED' | 'POSTING';

export type FeedForm = {
  category: string | number; // SelectOption;
  subTitle: string;
  // 작성자는 UI상으로만 표시하면됨
  introduction: string;
  conclusion: string;
  curations: Curation[];
  activeTime: string;
  thumbnailUrl: string;
  likeCounts?: number; // 초기에는 없음
  activated: HomeFeedStatus;
  uploadDate: string; // 2022-01-01
  uploadTime: string; // 00:00:00
};

const initialCuration: Curation = {
  bakery: { bakeryName: '' },
  bread: { productName: '' },
  reason: '',
};

const initialForm: FeedForm = {
  category: 1, // { value: '1', name: '월별 트렌드 빵집' },
  subTitle: '',
  introduction: '',
  conclusion: '',
  curations: [initialCuration],
  activeTime: '',
  thumbnailUrl: '',
  likeCounts: 0,
  activated: 'INACTIVATED',
  uploadDate: dashDateFormat(new Date()), // 2022-01-01
  uploadTime: '00:00:00', // 00:00:00
};

interface HomeFeedState {
  loading: boolean;
  error: boolean;
  form: FeedForm;
}

const initialState: HomeFeedState = {
  loading: false,
  error: false,
  form: initialForm,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // 초기 셋팅
    setForm(state, action: PayloadAction<{ form: any }>) {
      const {
        form: { common, curation },
        // landing은 항상 null
      } = action.payload;

      console.log('comm', common);

      // state.form = form;
      state.form = { ...state.form, ...common, ...curation };
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [date, time] = common?.activateTime?.split('T');
      state.form.uploadDate = date;
      state.form.uploadTime = time;
      state.form.curations = curation.map((c: any) => ({
        bakery: {
          bakeryId: c.bakeryId,
          bakeryName: c.bakeryName,
        },
        bread: {
          productId: c.productId,
          productName: c.productName,
        },
        reason: c.reason,
      }));
    },
    changeForm(state, action: PayloadAction<{ name: string; value: any }>) {
      const { name, value } = action.payload;

      state.form = {
        ...state.form,
        [name]: value,
      };
    },
    changeHomeFeedStatus(state, action: PayloadAction<{ activated: HomeFeedStatus }>) {
      const { activated } = action.payload;
      state.form.activated = activated;
    },
    changeCuration(
      state,
      action: PayloadAction<{
        currIdx: number;
        key: 'bakery' | 'bread' | 'reason';
        value: any;
      }>
    ) {
      const { currIdx, key, value } = action.payload;
      const target = state.form.curations[currIdx];
      state.form.curations.splice(currIdx, 1, { ...target, [key]: value });
    },
    addCuration(state) {
      state.form.curations.push(initialCuration);
    },
    removeCuration(state, action: PayloadAction<{ index: number }>) {
      state.form.curations.splice(action.payload.index, 1);
    },
    initializeForm(state) {
      state.form = initialForm;
    },
  },
});

export default feedSlice.reducer;
export const { setForm, changeForm, changeHomeFeedStatus, changeCuration, addCuration, removeCuration, initializeForm } = feedSlice.actions;
