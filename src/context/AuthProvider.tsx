import React from 'react';
import { Storage, userStorage } from '@/utils';

export type Auth = {
  accessToken?: string;
  refreshToken?: string;
};

const AuthContext = React.createContext<{ auth: Auth; setAuth: React.Dispatch<React.SetStateAction<Auth>> } | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = React.useState<Auth>({});
  const token = userStorage.getItem<{ accessToken: string; refreshToken: string }>(Storage.Token);

  React.useEffect(() => {
    if (token) {
      setAuth({ accessToken: token.accessToken, refreshToken: token.refreshToken });
    }
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
