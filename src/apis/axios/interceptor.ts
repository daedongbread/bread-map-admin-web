import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetcher } from '@/apis/axios/fetcher';
import { PATH } from '@/constants';
import { useRefreshToken } from '@/hooks/auth/useRefreshToken';
import { Storage, userStorage } from '@/utils';

export const reqSuccessFn = (config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  const token = userStorage.getItem(Storage.Token);
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

let refreshingToken: Promise<string | undefined> | null = null;

export const resFailFn = async (error: any) => {
  const config = error.config;
  const refresh = useRefreshToken();
  if (error.response.data?.message === 'Invalid JWT' && !config._retry) {
    config._retry = true;
    try {
      refreshingToken = refreshingToken ? refreshingToken : refresh();
      const accessToken = await refreshingToken;
      if (accessToken) {
        return fetcher(config);
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
