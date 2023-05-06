import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { LoginResponse, requestRefresh } from '@/apis/auth/login';
import { fetcher } from '@/apis/axios/fetcher';
import { ERROR_CODE, PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';
import { StorageKeys, truncateUserStorageTokens, userStorage } from '@/utils';

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

const refresh = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  return requestRefresh({ accessToken, refreshToken });
};

export const useInterceptor = () => {
  const { setAuth } = useAuth();

  const requestInterceptor = fetcher.interceptors.request.use(
    config => {
      const token = userStorage.getItem<{ [key: string]: string }>(StorageKeys.Token);
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
          toast(`오류가 발생하였습니다. 대동빵팀에게 문의해주세요. (오류 메시지: ${errorMessage})`);
          break;
        }
        case ERROR_CODE.INVALID_TOKEN: {
          replaceLoginAndTruncateTokens();
          break;
        }
        case ERROR_CODE.EXPIRED_TOKEN: {
          const response = await handleExpiredToken(originalRequestConfig);
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

  const handleExpiredToken = async (originalRequestConfig: RetryAxiosRequestConfig) => {
    if (originalRequestConfig.retry) {
      return;
    }
    originalRequestConfig.retry = true;
    const storageToken = userStorage.getItem<{ [key: string]: string }>(StorageKeys.Token);
    if (!storageToken) {
      return;
    }

    const refreshResponse = await refreshTokenAndUpdateAuth(storageToken.accessToken, storageToken.refreshToken);
    if (!refreshResponse) {
      toast(`장시간 사용하지 않아 다시 로그인이 필요합니다. (url: ${originalRequestConfig.url})`);
      replaceLoginAndTruncateTokens();
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
    toast(`오류가 발생하였습니다. 대동빵팀에게 문의해주세요. (오류 메시지: ${errorMessage})`);
  };

  const toast = (message: string) => {
    const errorEvent = new CustomEvent('axiosError', { detail: message });
    window.dispatchEvent(errorEvent);
  };

  const replaceLoginAndTruncateTokens = () => {
    truncateUserStorageTokens();
    window.location.replace(PATH.Login);
  };
};
