import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { bakerySlice, homeFeedSlice } from './slices';

const reducer = combineReducers({
  bakery: bakerySlice,
  homeFeed: homeFeedSlice,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
