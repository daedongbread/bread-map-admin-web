import React from 'react';
import { Input } from '@/components/Shared/Input';
import { Row, RowContents } from '@/styles';

type Props = {
  label: string;
  textarea?: boolean;
  placeholder?: string;
  rowNoMargin?: boolean;
  name: string;
  value: string;
  multiline?: boolean;
  multilineRowCount?: number;
  alignTop?: boolean;
  onChangeForm: (payload: { name: string; value: string }) => void;
};

export const TextField = ({ label, textarea = false, placeholder, rowNoMargin, name, value, multiline, multilineRowCount, alignTop, onChangeForm }: Props) => {
  return (
    <Row noMargin={rowNoMargin} alignTop={alignTop}>
      <label>
        {label.split('\n').map((str, index) => (
          <React.Fragment key={index}>
            {str}
            <br />
          </React.Fragment>
        ))}
      </label>
      <RowContents>
        <Input
          name={name}
          type={'plain'}
          placeholder={placeholder || ''}
          textarea={textarea}
          value={value}
          multiLine={multiline}
          multiLineRowCount={multilineRowCount}
          onChangeInput={e => onChangeForm({ name, value: e.target.value })}
        />
      </RowContents>
    </Row>
  );
};
