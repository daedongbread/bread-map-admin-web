import React from 'react';
import { useAuth } from '@/hooks/auth';
import { useLocation, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PATH } from '@/constants';

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? <Layout /> : <Navigate to={PATH.Login} state={{ from: location }} replace />;
};
