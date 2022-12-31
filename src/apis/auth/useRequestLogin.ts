import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';
import { Storage, userStorage } from '@/utils';
import { rememberUser, removeUser, requestLogin } from './login';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const useRequestLogin = () => {
    const { data, mutate, isLoading, isError } = useMutation(requestLogin, {
      onSuccess: data => {
        const { accessToken, refreshToken, isRemembered, email, password } = data;
        setAuth({ accessToken, refreshToken });

        if (isRemembered) {
          rememberUser({ email, password });
        } else {
          removeUser();
        }

        navigate(PATH.Bakeries, { replace: true });
      },
      onError: onErrorLogin,
    });

    return {
      mutate,
      data,
      loading: isLoading,
      error: isError,
      refetch: null,
    };
  };

  const logout = () => {
    userStorage.removeItem(Storage.Token);
    setAuth({ accessToken: null, refreshToken: null });
    navigate(PATH.Login, { replace: true });
  };

  return { login: useRequestLogin, logout };
};

const onErrorLogin = (error: unknown) => {
  console.log(error);
};
