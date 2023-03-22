import React from 'react';
import { Input } from '@/components/Shared';
import styled from '@emotion/styled';

type InputFieldLayout = 'inline' | 'block';

type Props = {
  type: 'input' | 'textarea';
  title: string;
  content: string;
  layout: InputFieldLayout;
  copyable?: boolean;
};
// TODO: 토스트 메시지 만들기
export const ReadOnlyInputField = ({ type, title, content, layout, copyable = false }: Props) => {
  return (
    <Container layout={layout} copyable={copyable}>
      <label>{title}</label>
      <div>
        <Input textarea={type === 'textarea'} type={'gray'} disabled value={content} />
      </div>
    </Container>
  );
};

const Container = styled.div<{ layout: InputFieldLayout; copyable: boolean }>`
  margin: 2rem 0;

  label {
    display: ${({ layout }) => (layout === 'block' ? 'block' : 'inline-block')};
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  div {
    cursor: ${({ copyable }) => (copyable ? 'pointer' : 'default')};
  }
`;
