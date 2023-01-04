import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLogin } from '@/apis';
import { MenuCountEntity } from '@/apis/menu/types';
import { Frown, Pencil, Server, Users, User, Logout } from '@/components/Shared/Icons';
import { PATH, Path } from '@/constants';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';

export const SideBar = ({ menuCount }: { menuCount?: MenuCountEntity }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogin();

  const isCurrent = (path: Path) => {
    const url = location.pathname;
    const detailRegex = /(\/.*)(?:\/)\w/;
    const regex = /(\/.*)/;
    const matched = url.match(detailRegex) || url.match(regex);

    return path === matched?.[1];
  };

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

  const getMenuCount = (path: Path) => {
    switch (path) {
      case PATH.BakeryReports:
        return menuCount?.bakeryReportCount || 0;
      case PATH.Bakeries:
        return menuCount?.bakeryCount || 0;
      case PATH.UserReports:
        return menuCount?.reviewReportCount || 0;
    }
  };

  return (
    <Container>
      <Header>
        <h1>대동빵지도</h1>
      </Header>
      <ul>
        {MENUS.map(menu => (
          <MenuLink key={menu.path} to={menu.path}>
            <MenuItem icon={menu.icon} name={menu.name} noti={getMenuCount(menu.path)} active={isCurrent(menu.path)} />
          </MenuLink>
        ))}
      </ul>
      <ul>
        {SETTING_MENUS.map(menu => (
          <button key={menu.name} onClick={getSettingMenuFn(menu.name)}>
            <MenuItem icon={menu.icon} name={menu.name} />
          </button>
        ))}
      </ul>
    </Container>
  );
};

const MENUS = [
  {
    name: '제보관리',
    path: PATH.BakeryReports,
    icon: <Pencil />,
    noti: 43,
  },
  {
    name: '빵집관리',
    path: PATH.Bakeries,
    icon: <Server />,
    noti: 141,
  },
  {
    name: '신고목록',
    path: PATH.UserReports,
    icon: <Frown />,
    noti: 0,
  },
  {
    name: '사용자관리',
    path: PATH.Users,
    icon: <Users />,
    noti: 0,
  },
];

const SETTING_MENUS = [
  // {
  //   name: '계정',
  //   path: '',
  //   icon: <User />,
  // },
  {
    name: '로그아웃',
    path: null,
    icon: <Logout />,
    action: '',
  },
];

const Container = styled.div`
  width: ${({ theme }) => theme.size.sidebarWidth};
  height: 100%;
  display: flex;
  flex-direction: column;

  ul {
    &:first-of-type {
      flex: 1;
    }
    &:last-of-type {
      margin-bottom: 3rem;
    }
  }
`;

const Header = styled.div`
  padding: 3rem 2.4rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
`;
