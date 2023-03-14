import React from 'react';
import hamburger from '/images/hamburger.png';
import { CheckLine } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  isSelected: boolean;
};

export const SelectableImg = ({ isSelected }: Props) => {
  return (
    <div>
      <ImgContainer>
        <img src={hamburger} alt={'빵'} />
        <CheckBox isSelected={isSelected}>
          <CheckLine />
        </CheckBox>
      </ImgContainer>
    </div>
  );
};

const ImgContainer = styled.div`
  position: relative;
  width: 25rem;
  height: 25rem;
  border-radius: 1rem;
  overflow: hidden;
  object-fit: cover;

  > img {
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CheckBox = styled.div<{ isSelected: boolean }>`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  background: ${({ isSelected, theme }) => (isSelected ? theme.color.primary500 : `rgba(0, 0, 0, 0.6)`)}; // 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;
