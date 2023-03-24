import React, { memo, ReactNode } from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

type BtnColor = 'orange' | 'lightOrange' | 'reverseOrange' | 'gray' | 'white';
type Size = 'large' | 'medium' | 'small';

type ButtonProps = {
  type: BtnColor;
  text: string;
  btnSize?: Size;
  fontSize?: Size;
  icon?: ReactNode;
  onClickBtn?: () => void;
};

export const Button = memo(({ type, text, btnSize, fontSize = 'small', icon, onClickBtn }: ButtonProps) => {
  const onClickCustomBtn = () => {
    onClickBtn && onClickBtn();
  };

  const matchedStyle = Object.entries(BUTTON_STYLE).find(([key]) => key === type);
  if (!matchedStyle) return <button />;
  const colors = matchedStyle[1];

  return (
    <CustomBtn type="button" btnSize={btnSize} fontSize={fontSize} {...colors} onClick={onClickCustomBtn}>
      {icon}
      {text}
    </CustomBtn>
  );
});

type BtnStyles = {
  bgColor: string;
  fontColor: string;
  borderColor?: string;
};

const BUTTON_STYLE: { [key: string]: BtnStyles } = {
  orange: {
    bgColor: color.primary500,
    fontColor: color.white,
  },
  lightOrange: {
    bgColor: color.primary400,
    fontColor: color.white,
  },
  reverseOrange: {
    bgColor: color.white,
    fontColor: color.primary500,
    borderColor: color.primary500,
  },
  gray: {
    bgColor: color.gray500,
    fontColor: color.white,
  },
  white: {
    bgColor: color.white,
    fontColor: color.gray700,
    borderColor: color.gray300,
  },
};

const CustomBtn = styled.button<BtnStyles & { btnSize?: Size; fontSize?: Size }>`
  border-radius: 0.9rem;
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  padding: ${({ btnSize }) =>
    btnSize === 'large' ? '2.2rem 2.8rem' : btnSize === 'medium' ? '1.2rem 2.2rem' : btnSize === 'small' ? '1rem 1.8rem' : '1.6rem 0'};
  width: ${({ btnSize }) => !btnSize && '100%'};
  font-weight: bold;
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => (fontSize === 'large' ? '2rem' : fontSize === 'medium' ? '1.6rem' : '1.4rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  // svg 위치 설정 필요
`;
// btnSize 없애고 위아래 패딩으로?..
