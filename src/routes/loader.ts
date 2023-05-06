import { redirect } from 'react-router-dom';
import { PATH } from '@/constants';
import { StorageKeys, userStorage } from '@/utils';

export const loginPageLoader = () => {
  const token = userStorage.getItem<{ accessToken: string; refreshToken: string }>(StorageKeys.Token);
  if (token && token.accessToken) {
    return redirect(`${PATH.Bakeries}/all`);
  }
  return null;
};
