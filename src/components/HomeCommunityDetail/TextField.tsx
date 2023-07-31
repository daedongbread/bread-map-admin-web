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
  alignTop?: boolean;
};

export const TextField = ({ label, textarea = false, placeholder, name, value, onChangeForm, alignTop = false }: Props) => {
  return (
    <Row alignTop={alignTop}>
      <label>{label}</label>
      <RowContents>
        <Input
          name={name}
          type={'plain'}
          placeholder={placeholder || ''}
          textarea={textarea}
          value={value}
          multiLine={textarea}
          multiLineRowCount={15}
          onChangeInput={e => onChangeForm({ name, value: e.target.value })}
        />
      </RowContents>
    </Row>
  );
};
