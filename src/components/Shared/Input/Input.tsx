import React, { ChangeEvent, KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

type InputStyleType = 'plain' | 'gray' | 'disabled' | 'orange';
type PaddingType = 'small' | 'large';
export type InputTextType = 'text' | 'number' | 'password';

export type InputProps = {
  textType?: InputTextType;
  type: InputStyleType;
  padding?: PaddingType;
  placeholder?: string;
  disabled?: boolean;
  textarea?: boolean;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeypressInput?: (e: KeyboardEvent<HTMLInputElement>) => void;
  name?: string;
  value: string;
};

export const Input = ({
  textType = 'text',
  type,
  padding = 'small',
  placeholder,
  disabled = false,
  textarea = false,
  onChangeInput,
  onKeypressInput,
  name,
  value,
}: InputProps) => {
  const [textareaRowCnt, setTextareaRowCnt] = useState(1);
  const textareaPrevLineCnt = useRef(1);

  const matchedStyle = Object.entries(INPUT_STYLE).find(([key]) => key === type);
  if (!matchedStyle) return <input />;
  const { borderColor, fontColor, bgColor, placeholderColor, focusBorderColor, focusBgColor } = matchedStyle[1];

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeInput && onChangeInput(e);
  };

  const resizeTextarea = (value: string) => {
    let lineCnt = 1;
    if (value?.length > 0 && value.includes('\n')) {
      lineCnt = value.split('\n').length;
      if (lineCnt === textareaPrevLineCnt.current) {
        return;
      }
      textareaPrevLineCnt.current = lineCnt;
    }
    setTextareaRowCnt(lineCnt);
  };

  useLayoutEffect(() => {
    if (!textarea) {
      return;
    }
    resizeTextarea(value);
  }, [value]);

  if (textarea) {
    return (
      <CustomTextarea
        rows={textareaRowCnt}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChangeTextarea}
        borderColor={borderColor}
        fontColor={fontColor}
        bgColor={bgColor}
        placeholderColor={placeholderColor}
        focusBorderColor={focusBorderColor}
        focusBgColor={focusBgColor}
        padding={padding}
        placeholder={placeholder || ''}
      />
    );
  } else {
    return (
      <CustomInput
        disabled={disabled}
        name={name}
        type={textType}
        value={value}
        onChange={onChangeInput}
        onKeyPress={onKeypressInput}
        borderColor={borderColor}
        fontColor={fontColor}
        bgColor={bgColor}
        placeholderColor={placeholderColor}
        focusBorderColor={focusBorderColor}
        focusBgColor={focusBgColor}
        padding={padding}
        placeholder={placeholder || ''}
      />
    );
  }
};

type InputStyles = {
  bgColor: string;
  fontColor: string;
  placeholderColor: string;
  borderColor?: string;
  focusBorderColor?: string;
  focusBgColor?: string;
};

const INPUT_STYLE: { [key: string]: InputStyles } = {
  plain: {
    bgColor: color.white,
    fontColor: color.gray900,
    placeholderColor: color.gray500,
    borderColor: color.gray400,
    focusBorderColor: color.gray600,
  },
  gray: {
    bgColor: color.gray100,
    fontColor: color.gray800,
    placeholderColor: color.gray800,
    borderColor: color.gray300,
  },
  disabled: {
    bgColor: color.gray100,
    fontColor: color.gray800,
    placeholderColor: color.gray800,
    borderColor: color.gray300,
  },
  orange: {
    bgColor: color.prmary50,
    fontColor: color.gray600,
    placeholderColor: color.gray600,
    focusBorderColor: color.primary200,
  },
};

const CustomInput = styled.input<InputStyles & { padding?: PaddingType }>`
  padding: ${({ padding }) => (padding === 'small' ? '1rem 1.4rem' : '1.8rem 2.3rem')};
  border-radius: ${({ padding }) => (padding === 'small' ? '10px' : '16px')};
  width: 100%;
  outline: none;
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : '1px solid rgba(255,255,255,0)')};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};

  ::placeholder {
    font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};
    color: ${({ placeholderColor }) => placeholderColor};
  }

  :focus {
    border: ${({ borderColor, focusBorderColor }) => borderColor && focusBorderColor && `1.5px solid ${focusBorderColor}`};
    background-color: ${({ focusBgColor }) => focusBgColor && focusBgColor};
    box-shadow: ${({ borderColor, focusBorderColor }) => (borderColor ? 'none' : focusBorderColor ? `0 0 0 1.5px ${focusBorderColor}` : 'none')};
  }
`;

const CustomTextarea = styled.textarea<InputStyles & { padding?: PaddingType }>`
  resize: none;
  padding: ${({ padding }) => (padding === 'small' ? '1rem 1.4rem' : '1.1rem 2.3rem')};
  border-radius: ${({ padding }) => (padding === 'small' ? '10px' : '16px')};
  width: 100%;
  min-height: 3.7rem;
  outline: none;
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : '1px solid transparent')};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ::placeholder {
    font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};
    color: ${({ placeholderColor }) => placeholderColor};
  }

  ::-webkit-scrollbar {
    display: none;
  }

  :focus {
    border: ${({ borderColor, focusBorderColor }) => borderColor && focusBorderColor && `1.5px solid ${focusBorderColor}`};
    background-color: ${({ focusBgColor }) => focusBgColor && focusBgColor};
    box-shadow: ${({ borderColor, focusBorderColor }) => (borderColor ? 'none' : focusBorderColor ? `0 0 0 1.5px ${focusBorderColor}` : 'none')};
  }
`;
