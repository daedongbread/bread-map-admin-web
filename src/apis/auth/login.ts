import { loginStorage, Storage, userStorage } from '@/utils';
import { fetcher } from '../axios';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
};

const saveUserToken = ({ accessToken, refreshToken }: LoginResponse) => {
  userStorage.setItem(Storage.Token, {
    accessToken,
    refreshToken,
  });
};

const rememberUser = ({ email, password }: { email: string; password: string }) => {
  loginStorage.setMultipleItems([
    [
      Storage.Form,
      {
        email,
        password,
      },
    ],
    [Storage.IsRemembered, true],
  ]);
};

const removeUser = () => {
  const form = loginStorage.getItem(Storage.Form);
  if (form) {
    loginStorage.removeItem(Storage.Form);
  }
  loginStorage.setItem(Storage.IsRemembered, false);
};

const requestLogin = async ({ email, password }: LoginPayload) => {
  const resp = await fetcher.post<LoginResponse>(`/login`, {
    email,
    password,
  });
  return resp.data;
};

const requestRefresh = async ({ accessToken, refreshToken }: RefreshRequest) => {
  const resp = await fetcher.post<LoginResponse>('/reissue', {
    accessToken,
    refreshToken,
  });

  return resp.data;
};

export { saveUserToken, rememberUser, removeUser, requestLogin, requestRefresh };
