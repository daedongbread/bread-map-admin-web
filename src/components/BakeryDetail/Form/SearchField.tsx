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
  onClickSearch: () => void;
};

export const SearchField = ({ label, textarea = false, placeholder, name, value, onClickSearch }: Props) => {
  return (
    <Row>
      <label>{label}</label>
      <RowContents>
        <Input disabled={true} name={name} type={'plain'} placeholder={placeholder || ''} textarea={textarea} value={value} />
        <div className="icon" onClick={onClickSearch}>
          <Search />
        </div>
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
