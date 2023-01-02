import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { useRefreshToken } from '@/hooks/auth/useRefreshToken';

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  React.useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>loading...</p> : <Outlet />}</>;
};
