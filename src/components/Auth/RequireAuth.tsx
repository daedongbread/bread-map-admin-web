import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { PATH } from '@/constants';
import { useAuth } from '@/hooks/auth';

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? <Layout /> : <Navigate to={PATH.Login} state={{ from: location }} replace />;
};
