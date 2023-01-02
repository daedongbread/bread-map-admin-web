import React from 'react';
import AuthContext from '@/context/AuthProvider';

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('auth context가 없습니다.');
  }

  return context;
};
