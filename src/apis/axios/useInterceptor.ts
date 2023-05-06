import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginResponse, requestRefresh } from '@/apis/auth/login';
import { fetcher } from '@/apis/axios/fetcher';
import { ERROR_CODE, PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';
import { Storage, userStorage } from '@/utils';

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

const refresh = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  return requestRefresh({ accessToken, refreshToken });
};

export const useInterceptor = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const requestInterceptor = fetcher.interceptors.request.use(
    config => {
      const token = userStorage.getItem<{ [key: string]: string }>(Storage.Token);
      if (token && token.accessToken) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const responseInterceptor = fetcher.interceptors.response.use(
    (response: AxiosResponse) => {
      return { ...response.data };
    },
    async error => {
      if (!error.response.data) {
        return Promise.reject(error);
      }
      const {
        config: originalRequestConfig,
        response: {
          data: { code: errorCode, message: errorMessage },
        },
      } = error;

      switch (errorCode) {
        case ERROR_CODE.CLIENT_FAILED: {
          handleClientError(errorMessage);
          break;
        }
        case ERROR_CODE.EXPIRED_TOKEN: {
          const response = await handleExpiredToken(originalRequestConfig, navigate);
          if (response) {
            return response;
          }
          break;
        }
        default: {
          console.log('axios response err:', error.response);
          handleUnknownError(errorCode, errorMessage, originalRequestConfig);
        }
      }
      return Promise.reject(error);
    }
  );

  const refreshTokenAndUpdateAuth = (accessToken: string, refreshToken: string): Promise<LoginResponse | null> => {
    return refresh({ accessToken, refreshToken })
      .then((response: LoginResponse) => {
        if (!response) {
          console.error('Response is null');
          return null;
        }
        return response;
      })
      .catch(err => {
        console.error(err);
        return null;
      });
  };

  useEffect(() => {
    return () => {
      fetcher.interceptors.request.eject(requestInterceptor);
      fetcher.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);

  const handleClientError = (errorMessage: string) => {
    const errorEvent = new CustomEvent('axiosError', { detail: `오류가 발생하였습니다. 대동빵팀에게 문의해주세요. (오류 메시지: ${errorMessage})` });
    window.dispatchEvent(errorEvent);
  };

  const handleExpiredToken = async (originalRequestConfig: RetryAxiosRequestConfig, navigate: NavigateFunction) => {
    if (originalRequestConfig.retry) {
      return;
    }
    originalRequestConfig.retry = true;
    const storageToken = userStorage.getItem<{ [key: string]: string }>(Storage.Token);
    if (!storageToken) {
      return;
    }

    const refreshResponse = await refreshTokenAndUpdateAuth(storageToken.accessToken, storageToken.refreshToken);
    if (!refreshResponse) {
      window.confirm('장시간 사용하지 않아 다시 로그인이 필요합니다.');
      navigate(PATH.Login, { replace: true });
      return;
    }

    const { accessToken, refreshToken, accessTokenExpiredDate } = refreshResponse;
    setAuth({
      accessToken,
      refreshToken,
      expiredAt: new Date().getTime() + accessTokenExpiredDate,
    });

    if (accessToken) {
      return fetcher(originalRequestConfig);
    }
  };

  const handleUnknownError = (errorCode: number, errorMessage: string, originalRequestConfig: RetryAxiosRequestConfig) => {
    if (originalRequestConfig.retry) {
      return;
    }
    const errorEvent = new CustomEvent('axiosError', { detail: `오류가 발생하였습니다. 대동빵팀에게 문의해주세요. (오류 메시지: ${errorMessage})` });
    window.dispatchEvent(errorEvent);
  };
};
