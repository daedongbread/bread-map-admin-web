import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMenu } from '@/apis';
import { RotatingArrow } from '@/components/Shared/Icons/RotatingArrow';
import styled from '@emotion/styled';
import { SideBar } from './SideBar';

export const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const {
    menuCountQuery: { data: menuCount },
  } = useMenu();

  const toggleSideBar = () => {
    setIsSideBarOpen(prev => !prev);
  };

  return (
    <Container isSideBarOpen={isSideBarOpen}>
      <aside>
        <SideBar menuCount={menuCount} isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      </aside>
      <Button onClick={toggleSideBar} isSideBarOpen={isSideBarOpen}>
        <RotatingArrow direction={isSideBarOpen ? 'left' : 'right'} />
      </Button>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

type ContainerProps = {
  isSideBarOpen: boolean;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100vw;
  min-height: 100vh;

  > aside {
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.color.white};
    border-right: ${({ theme }) => `1px solid ${theme.color.gray200}`};

    width: ${({ theme, isSideBarOpen }) => (isSideBarOpen ? theme.size.sidebarWidth : theme.size.minimumSidebarWidth)};
    transition: width 0.2s;
  }

  main {
    flex: 1;
    padding-left: ${({ theme, isSideBarOpen }) => (isSideBarOpen ? theme.size.sidebarWidth : theme.size.minimumSidebarWidth)};
    transition: padding-left 0.2s;
  }
`;

const Button = styled.button<ContainerProps>`
  position: fixed;
  top: 3.2rem;
  left: ${({ theme, isSideBarOpen }) => (isSideBarOpen ? theme.size.sidebarWidth : theme.size.minimumSidebarWidth)};
  z-index: 5;
  transform: translateX(-50%);
  transition: left 0.1s;
`;
