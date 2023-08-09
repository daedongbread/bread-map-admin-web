import React from 'react';
import { Input } from '@/components/Shared/Input';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  name: string;
  startValue: string;
  endValue: string;
};

export const TextRangeField = ({ label, name, startValue, endValue }: Props) => {
  return (
    <Row>
      <label>{label}</label>
      <InputContainer>
        <Input name={name} type={'gray'} value={startValue} disabled />
        ~
        <Input name={name} type={'gray'} value={endValue} disabled />
      </InputContainer>
    </Row>
  );
};

const InputContainer = styled.div`
  display: flex;
  width: 50rem;
  justify-content: space-between;
  align-items: center;

  input {
    max-width: 24rem;
  }
`;
