import { ReactNode } from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { theme } from '@/styles';
import { ThemeProvider } from '@emotion/react';

export const withRouter = (routes: ReactNode, initialEntry = '/') => {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
};

// TODO: React Query, Auth Provider
export const withAllContexts = (children: ReactNode) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
