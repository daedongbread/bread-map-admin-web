import React from 'react';
import { Outlet } from 'react-router-dom';

import { useMenuCount } from '@/apis';
import styled from '@emotion/styled';
import { SideBar } from './SideBar';

export const Layout = () => {
  const { data: menuCount, loading, error } = useMenuCount();

  return (
    <Container>
      <aside>
        <SideBar menuCount={menuCount} />
      </aside>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  > aside {
    border-right: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  }

  main {
    flex: 1;
  }
`;
