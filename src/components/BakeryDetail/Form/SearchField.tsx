import React from 'react';
import { Search } from '@/components/Shared/Icons';
import { Input } from '@/components/Shared/Input';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  textarea?: boolean;
  placeholder?: string;
  name: string;
  value: string;
  disabled?: boolean;
  onClickSearch: () => void;
};

export const SearchField = ({ label, textarea = false, placeholder, name, value, disabled, onClickSearch }: Props) => {
  const handleChangeInput = () => {
    // TODO: 삭제
  };
  return (
    <Row>
      <label>{label}</label>
      <RowContents>
        <Input
          disabled={disabled}
          name={name}
          type={'plain'}
          placeholder={placeholder || ''}
          textarea={textarea}
          value={value}
          onChangeInput={handleChangeInput}
        />
        {!disabled && (
          <div className="icon" onClick={onClickSearch}>
            <Search />
          </div>
        )}
      </RowContents>
    </Row>
  );
};

export const RowContents = styled.div`
  flex: 1;
  position: relative;

  .icon {
    position: absolute;
    right: 7px;
    top: 2px;
    cursor: pointer;

    > svg {
      transform: scale(0.65);
    }
  }
`;
