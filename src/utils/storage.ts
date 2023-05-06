import { EncryptStorage } from 'encrypt-storage';

const StorageKeys = {
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

const truncateUserStorageTokens = () => userStorage.removeItem(StorageKeys.Token);

export { loginStorage, userStorage, StorageKeys, truncateUserStorageTokens };
