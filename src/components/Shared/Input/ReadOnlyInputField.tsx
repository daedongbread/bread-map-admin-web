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
  multiLine?: boolean;
  labelMinWidth?: number;
};
// TODO: 토스트 메시지 만들기 (복사완료 메세지)
export const ReadOnlyInputField = ({
  type = 'input',
  label,
  labelLayout = 'inline',
  content,
  copyable = false,
  multiLine = false,
  labelMinWidth = LABEL_MIN_WIDTH,
}: Props) => {
  return (
    <Container layout={labelLayout} copyable={copyable} multiLine={multiLine} labelMinWidth={labelMinWidth}>
      {label && <label>{label}</label>}
      <div>
        <Input textarea={type === 'textarea'} type={'gray'} disabled value={content} multiLine={multiLine} />
      </div>
    </Container>
  );
};

const LABEL_MIN_WIDTH = 4.5;

const Container = styled.div<{ layout: LabelLayout; copyable: boolean; multiLine: boolean; labelMinWidth: number }>`
  display: ${({ layout }) => (layout === 'block' ? 'block' : 'flex')};
  align-items: ${({ multiLine }) => (multiLine ? 'flex-start' : 'center')};

  label {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: ${({ layout }) => (layout === 'block' ? '1rem' : '0')};
    min-width: ${({ layout, labelMinWidth }) => (layout === 'block' ? 'auto' : `${labelMinWidth}rem`)};
    margin-top: ${({ multiLine }) => (multiLine ? '1rem' : '0')};
  }

  div {
    flex: 1;
    cursor: ${({ copyable }) => (copyable ? 'pointer' : 'default')};
  }
`;
