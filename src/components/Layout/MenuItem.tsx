import { ReactNode } from 'react';
import styled from '@emotion/styled';

type MenuItemProps = {
  isSubItem?: boolean;
  icon: ReactNode;
  name?: string;
  active?: boolean;
  noti?: number;
  iconOnly: boolean;
};

export const MenuItem = ({ isSubItem = false, icon, name, active = false, noti = 0, iconOnly = false }: MenuItemProps) => {
  return (
    <ItemContainer isSubItem={isSubItem} active={active}>
      <IconContainer>{icon}</IconContainer>
      <ItemDetailContainer isIconMode={iconOnly}>
        <span>{name}</span>
        {noti > 0 && <Notification>{noti}</Notification>}
      </ItemDetailContainer>
    </ItemContainer>
  );
};

const ItemContainer = styled.div<{ isSubItem: boolean; active: boolean }>`
  display: flex;
  padding: ${({ isSubItem }) => (isSubItem ? '0.8rem 2.7rem 0.8rem 2.2rem' : '1.6rem 2.7rem 1.6rem 2.2rem')}; // 1.6rem 2.7rem 1.6rem 2.2rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.primary500};
    opacity: ${({ active }) => (active ? '1' : '0')};
  }

  > div {
    height: 21px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: ${({ isSubItem }) => (isSubItem ? '1.2rem' : '1.4rem')};
  }
  path {
    stroke: ${({ active, theme }) => (active ? `${theme.color.primary500}` : `${theme.color.gray900}`)};
  }

  span {
    margin-left: 1rem;
    flex: 1;
    color: ${({ active, theme }) => (active ? theme.color.primary500 : theme.color.gray900)};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 3rem;
`;

const ItemDetailContainer = styled.div<{ isIconMode: boolean }>`
  display: flex;
  align-items: center;

  width: ${({ isIconMode }) => (isIconMode ? '0' : '100%')};
  opacity: ${({ isIconMode }) => (isIconMode ? '0' : '1')};
  visibility: ${({ isIconMode }) => (isIconMode ? 'hidden' : 'visible')};
  transition-property: opacity, visibility;
  transition-duration: ${({ isIconMode }) => (isIconMode ? '0s' : '0.3s')};
  transition-timing-function: ease;
  transition-delay: ${({ isIconMode }) => (isIconMode ? '0s' : '0.1s')};
`;

const Notification = styled.div`
  color: ${({ theme }) => theme.color.primary500};
  background-color: ${({ theme }) => theme.color.primary100};
  display: inline-block;
  border-radius: 10px;
  padding: 0.2rem 1rem;
  font-weight: bold;
`;
