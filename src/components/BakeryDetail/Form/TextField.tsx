import React from 'react';
import { Input } from '@/components/Shared/Input';
import { Row, RowContents } from '@/styles';

type Props = {
  label: string;
  textarea?: boolean;
  placeholder?: string;
  name: string;
  value: string;
  onChangeForm: (payload: { name: string; value: string }) => void;
};

export const TextField = ({ label, textarea = false, placeholder, name, value, onChangeForm }: Props) => {
  return (
    <Row>
      <label>{label}</label>
      <RowContents>
        <Input
          name={name}
          type={'plain'}
          placeholder={placeholder || ''}
          textarea={textarea}
          value={value}
          onChangeInput={e => onChangeForm({ name, value: e.target.value })}
        />
      </RowContents>
    </Row>
  );
};
