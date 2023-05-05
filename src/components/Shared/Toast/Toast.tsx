import { useCallback, useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type ToastProps = {
  message: string;
  type: string;
  duration: number;
  onClose: () => void;
};

export const Toast = ({ message, type, duration, onClose }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 800); // fadeOut 애니메이션의 지속 시간과 일치하게 설정

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <Container type={type} isClosing={isClosing}>
      {message}
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.9;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div<{ type: string; isClosing: boolean }>`
  display: inline-block;
  padding: 1.2rem 1.8rem;
  border-radius: 0.8rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  opacity: 0.9;
  animation: ${fadeIn} 0.3s ease;

  ${props =>
    props.isClosing &&
    css`
      animation: ${fadeOut} 0.8s ease forwards;
    `}

  ${props =>
    props.type === 'error' &&
    css`
      background-color: #1e1e1e;
    `}

  ${props =>
    props.type === 'success' &&
    css`
      background-color: #66bb6a;
    `}

  ${props =>
    props.type === 'warning' &&
    css`
      background-color: #ffb74d;
    `}

  ${props =>
    props.type === 'info' &&
    css`
      background-color: #42a5f5;
    `}
`;
