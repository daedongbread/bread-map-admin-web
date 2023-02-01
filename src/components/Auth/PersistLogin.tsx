import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Error } from '@/components/Shared';
import { useAuth } from '@/hooks/auth';
import { useRefreshToken } from '@/hooks/auth/useRefreshToken';
import styled from '@emotion/styled';

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
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

  return (
    <>
      {isLoading ? (
        <Container>
          <Error errMsg={'페이지로 이동중이에요!'} withImg={false} />
        </Container>
      ) : (
        <Outlet />
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
