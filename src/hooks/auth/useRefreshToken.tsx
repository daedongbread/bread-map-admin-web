import React from 'react';
import { useAuth } from '@/hooks/auth';
import { requestRefresh } from '@/apis/auth/login';
import { Storage, userStorage } from '@/utils';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const token = userStorage.getItem<{ accessToken: string; refreshToken: string }>(Storage.Token);
    if (token) {
      const { accessToken, refreshToken } = token;
      const response = await requestRefresh({ accessToken, refreshToken });

      setAuth(prev => {
        // TODO: auth Provider에 저장할 필요가 있나 보기
        return {
          ...prev,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
      });

      return response.accessToken;
    }
  };

  return refresh;
};
