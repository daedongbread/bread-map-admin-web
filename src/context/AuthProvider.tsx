import React from 'react';
import { saveUserToken } from '@/apis/auth/login';
import { Storage, userStorage } from '@/utils';

export type Auth = {
  accessToken: string | null;
  refreshToken: string | null;
};

const AuthContext = React.createContext<{ auth: Auth; setAuth: React.Dispatch<React.SetStateAction<Auth>> } | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = React.useState<Auth>({ accessToken: null, refreshToken: null });
  const token = userStorage.getItem<{ accessToken: string; refreshToken: string }>(Storage.Token);

  React.useEffect(() => {
    if (token) {
      setAuth({ accessToken: token.accessToken, refreshToken: token.refreshToken });
    }
  }, []);

  React.useEffect(() => {
    if (auth.accessToken && auth.refreshToken) {
      saveUserToken({ accessToken: auth.accessToken, refreshToken: auth.refreshToken });
    }
  }, [auth.accessToken, auth.refreshToken]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
