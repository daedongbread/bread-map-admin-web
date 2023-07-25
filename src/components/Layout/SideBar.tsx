import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/apis';
import { MenuCountEntity } from '@/apis/menu/types';
import { MenuList } from '@/components/Layout/MenuList';
import { SideBarLogo } from '@/components/Layout/SideBarLogo';
import { Logout } from '@/components/Shared/Icons';
import { PATH } from '@/constants';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';

type Props = {
  menuCount?: MenuCountEntity;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
};

export const SideBar = ({ menuCount, isSideBarOpen, toggleSideBar }: Props) => {
  const navigate = useNavigate();
  const { logout } = useLogin();

  const onLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate(PATH.Login, { replace: true });
    }
  };

  const getSettingMenuFn = (menuName: string) => {
    switch (menuName) {
      case '로그아웃':
        return onLogout;
      default:
        return;
    }
  };

  const settingItems = SETTING_MENUS.map(menu => (
    <button key={menu.name} onClick={getSettingMenuFn(menu.name)}>
      <MenuItem icon={menu.icon} name={menu.name} iconOnly={!isSideBarOpen} />
    </button>
  ));

  return (
    <Container>
      <SideBarLogo isSideBarOpen={isSideBarOpen} />
      <MenuList menuCount={menuCount} isSideBarOpen={isSideBarOpen} />
      <ul>{settingItems}</ul>
    </Container>
  );
};

const SETTING_MENUS = [
  // { name: '계정', path: '', icon: <User /> },
  {
    name: '로그아웃',
    path: null,
    icon: <Logout />,
    action: '',
  },
];

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;

  ul {
    &:first-of-type {
      flex: 1;
    }

    &:last-of-type {
      margin-bottom: 1.5rem;
    }
  }
`;
