import { EncryptStorage } from 'encrypt-storage';

const Storage = {
  // AccessToken: 'accessToken',
  // RefreshToken: 'refreshToken',
  Token: 'token', // accessToken, refreshToken, expiredAt
  Form: 'form',
  IsRemembered: 'isRemembered',
};

const loginStorage = new EncryptStorage('secret-key-value', {
  prefix: '@login',
});

const userStorage = new EncryptStorage('secret-key-value', {
  prefix: '@user',
});

export { loginStorage, userStorage, Storage };
