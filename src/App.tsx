import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useInterceptor } from '@/apis/axios/useInterceptor';
import { router } from '@/routes';

const App = () => {
  useInterceptor();
  return <RouterProvider router={router} />;
};

export default App;
