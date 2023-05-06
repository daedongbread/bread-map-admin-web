import React, { createContext, Dispatch, SetStateAction, useEffect } from 'react';
import { saveUserToken } from '@/apis/auth/login';
import { StorageKeys, userStorage } from '@/utils';

export type Auth = {
  accessToken: string | null;
  refreshToken: string | null;
  expiredAt: number | null;
};

const AuthContext = createContext<{ auth: Auth; setAuth: Dispatch<SetStateAction<Auth>> } | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = React.useState<Auth>({ accessToken: null, refreshToken: null, expiredAt: null });
  const token = userStorage.getItem<{
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
  }>(StorageKeys.Token);

  useEffect(() => {
    if (token) {
      const { accessToken, refreshToken, expiredAt } = token;
      setAuth({ accessToken, refreshToken, expiredAt });
    }
  }, []);

  useEffect(() => {
    if (auth.accessToken && auth.refreshToken && auth.expiredAt) {
      saveUserToken({ accessToken: auth.accessToken, refreshToken: auth.refreshToken, expiredAt: auth.expiredAt });
    }
  }, [auth.accessToken, auth.refreshToken, auth.expiredAt]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
