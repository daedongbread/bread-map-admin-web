import { fetcher } from '@/apis/axios';
import { loginStorage, StorageKeys, userStorage } from '@/utils';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredDate: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
};

const saveUserToken = ({
  accessToken,
  refreshToken,
  expiredAt,
}: Omit<LoginResponse, 'accessTokenExpiredDate'> & {
  expiredAt: number;
}) => {
  userStorage.setItem(StorageKeys.Token, {
    accessToken,
    refreshToken,
    expiredAt,
  });
};

const rememberUser = ({ email, password }: { email: string; password: string }) => {
  loginStorage.setMultipleItems([
    [
      StorageKeys.Form,
      {
        email,
        password,
      },
    ],
    [StorageKeys.IsRemembered, true],
  ]);
};

const removeUser = () => {
  const form = loginStorage.getItem(StorageKeys.Form);
  if (form) {
    loginStorage.removeItem(StorageKeys.Form);
  }
  loginStorage.setItem(StorageKeys.IsRemembered, false);
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
