import React from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

type InputStyles = {
  bgColor: string;
  fontColor: string;
  placeholderColor: string;
  borderColor?: string;
};

const inputs: { [key: string]: InputStyles } = {
  plain: {
    bgColor: color.white,
    fontColor: color.gray900,
    placeholderColor: color.gray500,
    borderColor: color.gray400,
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
  },
};

type InputStyleType = 'plain' | 'gray' | 'disabled' | 'orange';

type PaddingType = 'small' | 'large';

export type InputProps = {
  textType?: string;
  type: InputStyleType;
  padding?: PaddingType;
  placeholder?: string;
  disabled?: boolean;
  textarea?: boolean;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeypressInput?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  name?: string;
  value: string;
};
// textbox로 수정. textarea도 가능하게..
export const Input = ({
  textType,
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
  const [rowCnt, setRowCnt] = React.useState(1);

  const matchedStyle = Object.entries(inputs).find(([key]) => key === type);
  if (!matchedStyle) return <input />;

  const resizeTextarea = (value: string) => {
    const lineCnt = value.split('\n').length;
    setRowCnt(lineCnt);
  };

  const onChangeTextareaAndResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeInput && onChangeInput(e);
    resizeTextarea(e.target.value);
  };

  React.useEffect(() => {
    if (textarea) {
      resizeTextarea(value);
    }
  }, []);

  if (textarea) {
    return (
      <CustomTextarea
        rows={rowCnt}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChangeTextareaAndResize}
        borderColor={matchedStyle[1].borderColor}
        fontColor={matchedStyle[1].fontColor}
        bgColor={matchedStyle[1].bgColor}
        placeholderColor={matchedStyle[1].placeholderColor}
        padding={padding}
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
        borderColor={matchedStyle[1].borderColor}
        fontColor={matchedStyle[1].fontColor}
        bgColor={matchedStyle[1].bgColor}
        placeholderColor={matchedStyle[1].placeholderColor}
        padding={padding}
        placeholder={placeholder || ''}
      />
    );
  }
};

const CustomInput = styled.input<InputStyles & { padding?: PaddingType }>`
  padding: ${({ padding }) => (padding === 'small' ? '1rem 1.4rem' : '1.8rem 2.3rem')};
  border-radius: ${({ padding }) => (padding === 'small' ? '10px' : '16px')};
  width: 100%;
  outline: none;
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};

  ::placeholder {
    font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};
    color: ${({ placeholderColor }) => placeholderColor};
  }
`;

const CustomTextarea = styled.textarea<InputStyles & { padding?: PaddingType }>`
  resize: none;
  padding: ${({ padding }) => (padding === 'small' ? '1rem 1.4rem' : '1.1rem 2.3rem')};
  border-radius: ${({ padding }) => (padding === 'small' ? '10px' : '16px')};
  width: 100%;
  min-height: 3.7rem;
  outline: none;
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
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
`;
