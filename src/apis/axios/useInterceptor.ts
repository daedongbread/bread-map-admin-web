import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginResponse, requestRefresh } from '@/apis/auth/login';
import { fetcher } from '@/apis/axios/fetcher';
import { PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';
import { Storage, userStorage } from '@/utils';

const refresh = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  return requestRefresh({ accessToken, refreshToken });
};

let refreshingToken: Promise<LoginResponse> | null = null;

export const useInterceptor = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const reqHandler = (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    const token = userStorage.getItem<{ [key: string]: string }>(Storage.Token);
    if (token && token.accessToken) {
      config.headers['Authorization'] = `Bearer ${token.accessToken}`;
    }

    return config;
  };

  const reqFailHandler = (error: any) => {
    return Promise.reject(error);
  };

  const resHandler = (response: AxiosResponse) => {
    return {
      ...response.data,
    };
  };

  const resFailHandler = async (error: any) => {
    const config = error.config;

    if (error.response.data?.code === 40100 && !config._retry) {
      config._retry = true;
      try {
        const token = userStorage.getItem<{ [key: string]: string }>(Storage.Token);
        if (token) {
          const { accessToken, refreshToken } = token;
          refreshingToken = refreshingToken ? refreshingToken : refresh({ accessToken, refreshToken });
          const newAccessToken = await refreshingToken;

          if (newAccessToken) {
            const { accessToken, refreshToken } = newAccessToken;
            setAuth({ accessToken, refreshToken });
            return fetcher(config);
          }
        }
      } catch (err) {
        window.confirm('장시간 사용하지않아 다시 로그인이 필요합니다.');
        navigate(PATH.Login, { replace: true });
        return Promise.reject(error);
      }
    } else {
      console.log('axios response err:', error.response);
      userStorage.removeItem(Storage.Token);
      window.confirm('알수없는 에러입니다. 대동빵팀에게 문의해주세요.');
      navigate(PATH.Login, { replace: true });
    }

    return Promise.reject(error);
  };

  const reqInterceptor = fetcher.interceptors.request.use(reqHandler, reqFailHandler);
  const resInterceptor = fetcher.interceptors.response.use(resHandler, resFailHandler);

  React.useEffect(() => {
    return () => {
      fetcher.interceptors.request.eject(reqInterceptor);
      fetcher.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);
};
