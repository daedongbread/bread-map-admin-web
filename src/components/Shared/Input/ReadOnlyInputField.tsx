import React from 'react';
import { Input } from '@/components/Shared';
import { useCopyClipboard } from '@/hooks/useCopyClipboard';
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
  const { isCopied, copyToClipboard } = useCopyClipboard(content);

  return (
    <Container layout={labelLayout} copyable={copyable} copied={isCopied} multiLine={multiLine} labelMinWidth={labelMinWidth}>
      {label && <label>{label}</label>}
      <div onClick={copyToClipboard}>
        <Input textarea={type === 'textarea'} type={'gray'} disabled value={content} multiLine={multiLine} />
        <span className="copy_btn">{isCopied ? 'copied' : 'copy'}</span>
      </div>
    </Container>
  );
};

const LABEL_MIN_WIDTH = 4.5;

const Container = styled.div<{ layout: LabelLayout; copyable: boolean; copied: boolean; multiLine: boolean; labelMinWidth: number }>`
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
    position: relative;
    cursor: ${({ copyable }) => (copyable ? 'pointer' : 'default')};

    > input {
      cursor: inherit;
    }

    :hover {
      .copy_btn {
        opacity: ${({ copyable }) => (copyable ? 1 : 0)};
        transition: 0.5s;
      }
    }

    .copy_btn {
      opacity: 0;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      background: ${({ theme, copied }) => (copied ? theme.color.primary400 : theme.color.gray400)};
      border-radius: 12px;
      height: 2.5rem;
      padding: 0 1rem;
      font-size: 1.1rem;
      color: ${({ theme }) => theme.color.white};
    }
  }
`;
