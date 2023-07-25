import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants';
import deabbang from '/images/deabbang.png';
import textLogo from '/images/text-logo-black.png';
import styled from '@emotion/styled';

type Props = {
  isSideBarOpen: boolean;
};

export const SideBarLogo = ({ isSideBarOpen }: Props) => {
  return (
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
  );
};

type SideBarOpenProps = {
  isOpen: boolean;
};

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
