import React, { ReactNode, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Close } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  title: string;
  children: ReactNode;
  closeModal: () => void;
};

export const ModalPortal = ({ title, children, closeModal }: Props) => {
  const domRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById('modal');
      domRef.current = dom;
    }
  }, []);

  if (domRef.current && mounted)
    return ReactDOM.createPortal(
      <ModalContainer>
        <Background></Background>
        <ContentContainer>
          <ContentHeader>
            <h1>{title}</h1>
            <button onClick={closeModal}>
              <Close />
            </button>
          </ContentHeader>
          <Content>{children}</Content>
        </ContentContainer>
      </ModalContainer>,
      domRef.current
    );
  return null;
};

const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 5;
`;

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ContentContainer = styled.div`
  min-width: 1000px;
  min-height: 30rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 3rem;
`;

const ContentHeader = styled.div`
  padding-bottom: 2rem;

  display: flex;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    flex: 1;
    margin-left: 0.8rem;
  }

  > button {
    align-items: center;
    justify-content: center;
  }
`;

const Content = styled.div``;
