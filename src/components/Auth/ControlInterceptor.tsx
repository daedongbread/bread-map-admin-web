import React from 'react';
import { Outlet } from 'react-router-dom';
import { useInterceptor } from '@/apis/axios/useInterceptor';

export const ControlInterceptor = () => {
  useInterceptor();
  return <Outlet />;
};
