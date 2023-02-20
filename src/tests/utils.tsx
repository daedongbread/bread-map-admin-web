import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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

// TODO:  Auth Provider
export const withAllContexts = (children: ReactNode) => {
  const testClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
};
