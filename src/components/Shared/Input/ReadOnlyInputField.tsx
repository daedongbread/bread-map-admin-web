import React from 'react';
import { Input } from '@/components/Shared';
import styled from '@emotion/styled';

type LabelLayout = 'inline' | 'block';

type Props = {
  type?: 'input' | 'textarea';
  label?: string;
  labelLayout?: LabelLayout;
  content: string;
  copyable?: boolean;
};
// TODO: 토스트 메시지 만들기 (복사완료 메세지)
export const ReadOnlyInputField = ({ type = 'input', label, labelLayout = 'inline', content, copyable = false }: Props) => {
  return (
    <Container layout={labelLayout} copyable={copyable}>
      {label && <label>{label}</label>}
      <div>
        <Input textarea={type === 'textarea'} type={'gray'} disabled value={content} />
      </div>
    </Container>
  );
};

const Container = styled.div<{ layout: LabelLayout; copyable: boolean }>`
  display: ${({ layout }) => (layout === 'block' ? 'block' : 'flex')};
  align-items: center;

  label {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: ${({ layout }) => (layout === 'block' ? '1rem' : '0')};
    min-width: ${({ layout }) => (layout === 'block' ? 'auto' : '4.5rem')};
  }

  div {
    flex: 1;
    cursor: ${({ copyable }) => (copyable ? 'pointer' : 'default')};
  }
`;
