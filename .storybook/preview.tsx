import React from 'react';
import { GlobalStyle } from '../src/styles';
import { AuthProvider } from '../src/context';
import { withAllContexts } from '../src/tests';

export const decorators = [
  (Story: any) =>
    withAllContexts(
      <>
        <GlobalStyle />
        <AuthProvider>
          <Story />
        </AuthProvider>
      </>
    ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
