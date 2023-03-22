import React from 'react';
import { Input } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  type: 'input' | 'textarea';
  title: string;
  content: string;
};

// TODO: ReadOnlyInputField 로 변경예정
//  UI 타입 Props
const ContentRow = ({ type, title, content }: Props) => {
  return (
    <RowWrapper>
      <label>{title}</label>
      <Input textarea={type === 'textarea'} type={'gray'} disabled value={content} />
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  margin: 2rem 0;
  label {
    display: block;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

export default ContentRow;
