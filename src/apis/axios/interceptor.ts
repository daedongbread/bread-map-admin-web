import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoginResponse, requestRefresh, saveUserToken } from '@/apis/auth/login';
import { fetcher } from '@/apis/axios/fetcher';
import { PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';
import { Storage, userStorage } from '@/utils';

export const reqSuccessFn = (config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  const token = userStorage.getItem<{ [key: string]: string }>(Storage.Token);
  if (token && token.accessToken) {
    config.headers['Authorization'] = `Bearer ${token.accessToken}`;
  }

  return config;
};

export const reqFailFn = (error: any) => {
  return Promise.reject(error);
};

export const resSuccessFn = (response: AxiosResponse) => {
  return {
    ...response.data,
  };
};

const refresh = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  return requestRefresh({ accessToken, refreshToken });
};

let refreshingToken: Promise<LoginResponse> | Promise<string> | null = null;

export const resFailFn = async (error: any) => {
  const config = error.config;
  // const { setAuth } = useAuth();

  if (error.response.data?.message === 'Invalid JWT' && !config._retry) {
    config._retry = true; // 무한요청 방지
    try {
      const token = userStorage.getItem<{ [key: string]: string }>(Storage.Token);
      if (token) {
        const { accessToken, refreshToken } = token;
        refreshingToken = refreshingToken ? refreshingToken : refresh({ accessToken, refreshToken });
        const newAccessToken = await refreshingToken;

        if (newAccessToken) {
          const { accessToken, refreshToken } = newAccessToken as LoginResponse;
          saveUserToken({ accessToken, refreshToken });
          // setAuth({ accessToken, refreshToken });
          // TODO: storage에는 저장하는데 store에 저장되지 않음
          return fetcher(config);
        }
      }
    } catch (err) {
      userStorage.removeItem(Storage.Token);
      window.confirm('장시간 사용하지않아 다시 로그인이 필요합니다.');
      window.location.replace(PATH.Login);
      return Promise.reject(error);
    }
  } else {
    console.log('axios response err:', error.response);
  }

  return Promise.reject(error);
};
