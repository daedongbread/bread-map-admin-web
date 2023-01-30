import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useAuth } from '@/hooks/auth';
import { Storage, userStorage } from '@/utils';
import { requestLogin } from './login';

export const useLogin = () => {
  const { setAuth } = useAuth();

  const login = useMutation(requestLogin, {
    onSuccess: data => {
      const { accessToken, refreshToken, accessTokenExpiredDate } = data;
      setAuth({ accessToken, refreshToken, expiredAt: new Date().getTime() + accessTokenExpiredDate });
    },
    onError: (err: AxiosError<{ code: number; message: string }>) => {
      // console.log('err..')
    },
  });

  const logout = () => {
    userStorage.removeItem(Storage.Token);
    setAuth({ accessToken: null, refreshToken: null, expiredAt: null });
  };

  return { login, logout };
};
