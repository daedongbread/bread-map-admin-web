import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { bakerySlice } from './slices';

const reducer = combineReducers({
  bakery: bakerySlice,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
