import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '@/apis';
import { MenuCountEntity } from '@/apis/menu/types';
import { Dislike, Logout, Meal, Pencil, Profile } from '@/components/Shared/Icons';
import { PATH, Path } from '@/constants';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';
import deabbang from '/images/deabbang.png';
import textLogo from '/images/text-logo-black.png';

type Props = {
  menuCount?: MenuCountEntity;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
};

export const SideBar = ({ menuCount, isSideBarOpen, toggleSideBar }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogin();

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

  const menuItems = MENUS.map(menu => (
    <MenuLink key={menu.path} to={menu.path}>
      <MenuItem
        icon={menu.icon}
        name={menu.name}
        noti={getMenuCount(menu.path)}
        active={!haveSubMenu(menu) && isCurrent({ path: menu.path })}
        iconOnly={!isSideBarOpen}
      />
      {menu.children && (
        <ul>
          {menu.children.map(child => (
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
          ))}
        </ul>
      )}
    </MenuLink>
  ));

  const settingItems = SETTING_MENUS.map(menu => (
    <button key={menu.name} onClick={getSettingMenuFn(menu.name)}>
      <MenuItem icon={menu.icon} name={menu.name} iconOnly={!isSideBarOpen} />
    </button>
  ));

  return (
    <Container>
      <Header isOpen={isSideBarOpen}>
        <Link to={`${PATH.Bakeries}/all`}>
          <BreadLogo>
            <img src={deabbang} />
          </BreadLogo>
          <TextLogo isOpen={isSideBarOpen}>
            <img src={textLogo} />
          </TextLogo>
        </Link>
      </Header>
      <ul>{menuItems}</ul>
      <ul>{settingItems}</ul>
    </Container>
  );
};

type Menu = {
  name: string;
  path: string;
  icon: React.ReactNode;
  noti?: number;
  children?: Menu[];
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
        name: '콘텐츠 관리',
        path: PATH.HomeScreen.Contents,
        icon: <div></div>,
      },
      {
        name: '관리자용 커뮤니티',
        path: PATH.HomeScreen.AdminCommunity,
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

const SETTING_MENUS = [
  // { name: '계정', path: '', icon: <User /> },
  {
    name: '로그아웃',
    path: null,
    icon: <Logout />,
    action: '',
  },
];

type SideBarOpenProps = {
  isOpen: boolean;
};

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

const Header = styled.div<SideBarOpenProps>`
  display: flex;
  height: 85px;
  padding: 3rem 1rem;

  a {
    display: flex;
    width: 100%;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.color.gray900};
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;

    margin-left: ${({ isOpen }) => (isOpen ? '1.2rem' : '0')};
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition-property: opacity, visibility;
    transition-duration: ${({ isOpen }) => (isOpen ? '0.3s' : '0s')};
    transition-timing-function: ease;
    transition-delay: ${({ isOpen }) => (isOpen ? '0.1s' : '0s')};
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  height: 80px;
`;

const BreadLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primary500};
  border-radius: 8px;

  width: 3.6rem;
  min-width: 3.6rem;
  height: 3.6rem;
  padding: 1rem;

  > img {
    width: 180%;
  }
`;

const TextLogo = styled.div<SideBarOpenProps>`
  display: flex;
  align-items: center;

  margin-left: ${({ isOpen }) => (isOpen ? '1.2rem' : '0')};
  width: ${({ isOpen }) => (isOpen ? '9rem' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition-property: opacity, visibility;
  transition-duration: ${({ isOpen }) => (isOpen ? '0.3s' : '0s')};
  transition-timing-function: ease;
  transition-delay: ${({ isOpen }) => (isOpen ? '0.1s' : '0s')};

  > img {
    width: 100%;
  }
`;
