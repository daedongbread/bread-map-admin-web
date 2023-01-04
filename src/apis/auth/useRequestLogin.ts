import { useMutation } from 'react-query';
import { useAuth } from '@/hooks/auth';
import { Storage, userStorage } from '@/utils';
import { requestLogin } from './login';

export const useLogin = () => {
  const { setAuth } = useAuth();

  const login = useMutation(requestLogin, {
    onSuccess: data => {
      const { accessToken, refreshToken } = data;
      setAuth({ accessToken, refreshToken });
    },
    onError: (err: unknown) => {
      console.log('login error...', err);
    },
  });

  const logout = () => {
    userStorage.removeItem(Storage.Token);
    setAuth({ accessToken: null, refreshToken: null });
  };

  return { login, logout };
};
