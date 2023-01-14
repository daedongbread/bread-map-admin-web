import React from 'react';

export const Loading = ({
  havePrevData,
  isLoading,
  loadingComponent,
  children,
}: {
  havePrevData: boolean;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (isLoading && !havePrevData) {
    return <>{loadingComponent}</>;
  }

  return <>{children}</>;
};
