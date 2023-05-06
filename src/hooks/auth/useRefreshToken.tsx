import React from 'react';
import { requestRefresh } from '@/apis/auth/login';
import { useAuth } from '@/hooks/auth';
import { StorageKeys, userStorage } from '@/utils';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const token = userStorage.getItem<{
      accessToken: string;
      refreshToken: string;
      expiredAt: number;
    }>(StorageKeys.Token);
    if (token) {
      const { accessToken, refreshToken } = token;
      const response = await requestRefresh({ accessToken, refreshToken });
      setAuth({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiredAt: new Date().getTime() + response.accessTokenExpiredDate,
      });

      return response.accessToken;
    }
  };

  return refresh;
};
