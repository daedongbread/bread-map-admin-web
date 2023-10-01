import React from 'react';
import { Link } from 'react-router-dom';
import { MenuCountEntity } from '@/apis/menu/types';
import { MenuItem } from '@/components/Layout/MenuItem';
import { Dislike, Meal, Pencil, Profile } from '@/components/Shared/Icons';
import { Path, PATH } from '@/constants';
import styled from '@emotion/styled';

export type Menu = {
  name: string;
  path: string;
  icon: React.ReactNode;
  noti?: number;
  children?: Menu[];
};

type Props = {
  menuCount?: MenuCountEntity;
  isSideBarOpen: boolean;
};

export const MenuList = ({ menuCount, isSideBarOpen }: Props) => {
  const isCurrent = ({ path, isChild = false }: { path: string; isChild?: boolean }) => {
    const url = location.pathname;
    if (isChild) {
      return url.includes(path);
    }
    const midMatchRegex = /(\/[a-zA-Z-]+)(?:\/)?/;
    const currUrlMid = url.match(midMatchRegex);
    const pathMid = path.match(midMatchRegex);

    return pathMid?.[1] === currUrlMid?.[1];
  };

  const getMenuCount = (path: Path) => {
    switch (path) {
      case PATH.BakeryReports:
        return menuCount?.bakeryAddReportCount || 0;
      case `${PATH.Bakeries}/all`:
        return menuCount?.bakeryCount || 0;
      case PATH.UserReports:
        return menuCount?.reviewReportCount || 0;
    }
  };

  const haveSubMenu = (menu: Menu) => {
    return menu.children && menu.children.length > 0;
  };

  return (
    <ul>
      {MENUS.map(menu => (
        <li key={menu.path}>
          {!menu.children && (
            <MenuLink to={menu.path}>
              <MenuItem
                icon={menu.icon}
                name={menu.name}
                noti={getMenuCount(menu.path)}
                active={!haveSubMenu(menu) && isCurrent({ path: menu.path })}
                iconOnly={!isSideBarOpen}
              />
            </MenuLink>
          )}

          {menu.children && (
            <div>
              <MenuItem
                icon={menu.icon}
                name={menu.name}
                noti={getMenuCount(menu.path)}
                active={!haveSubMenu(menu) && isCurrent({ path: menu.path })}
                iconOnly={!isSideBarOpen}
              />
              <ul>
                {menu.children.map(child => (
                  <li key={child.path}>
                    <MenuLink key={child.path} to={child.path}>
                      <MenuItem
                        isSubItem
                        icon={child.icon}
                        name={child.name}
                        noti={0}
                        active={isCurrent({ path: child.path, isChild: true })}
                        iconOnly={!isSideBarOpen}
                      />
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const MENUS: Menu[] = [
  {
    name: '신규 빵집제보',
    path: PATH.BakeryReports,
    icon: <Pencil />,
    noti: 43,
  },
  {
    name: '빵집관리',
    path: `${PATH.Bakeries}/all`,
    icon: <Meal />,
    noti: 141,
  },
  {
    name: '신고목록',
    path: PATH.UserReports,
    icon: <Dislike />,
    noti: 0,
  },
  {
    name: '홈 화면 관리',
    path: PATH.HomeScreen.Main,
    icon: <Dislike />,
    noti: 0,
    children: [
      {
        name: '케러셀 관리',
        path: PATH.HomeScreen.Carousel,
        icon: <div></div>,
      },
      {
        name: '랭킹 관리',
        path: PATH.HomeScreen.Ranking,
        icon: <div></div>,
      },
      {
        name: '큐레이션 관리',
        path: `${PATH.HomeScreen.Feeds}/all`,
        icon: <div></div>,
      },
      {
        name: '커뮤니티 이벤트 관리',
        path: `${PATH.HomeScreen.AdminCommunity}/all`,
        icon: <div></div>,
      },
    ],
  },
  {
    name: '사용자관리',
    path: PATH.Users,
    icon: <Profile />,
    noti: 0,
  },
];

const MenuLink = styled(Link)`
  text-decoration: none;
  height: 80px;
`;
