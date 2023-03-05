import React from 'react';
import { Input, InputProps } from '@/components/Shared/Input';
import { BakeryForm, BakeryFormChangeKey } from '@/store/slices/bakery';
import { Row, RowHalf } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  fullAddress: Pick<BakeryForm, 'address' | 'latitude' | 'longitude'>;
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: never }) => void;
};

export const AddressArea = ({ label, fullAddress, onChangeForm }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <Address>
        <Input
          placeholder={'도로명 주소를 적어주세요.'}
          type={'plain'}
          value={fullAddress.address}
          onChangeInput={e => onChangeForm({ name: 'address', value: e.target.value as never })}
        />
        <RowHalf>
          {CORD_INPUTS.map(input => (
            <div key={`addr-${input.name}`}>
              <label>{input.label}</label>
              <Input
                type={'plain'}
                value={String(fullAddress[input.name])}
                onChangeInput={e => onChangeForm({ name: input.name, value: e.target.value as never })}
              />
            </div>
          ))}
        </RowHalf>
      </Address>
    </Row>
  );
};

const CORD_INPUTS: ({ label: string; name: keyof Props['fullAddress'] } & Pick<InputProps, 'placeholder' | 'type'>)[] = [
  { label: '위도', name: 'latitude', placeholder: '', type: 'plain' },
  { label: '경도', name: 'longitude', placeholder: '', type: 'plain' },
];

const Address = styled.div`
  flex: 1;
  font-size: 1.4rem;
`;
