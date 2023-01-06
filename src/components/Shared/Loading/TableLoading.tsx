import React from 'react';
import styled from '@emotion/styled';

const LOAD_TEXT = '데이터를 불러오는 중입니다';

export const TableLoading = () => {
  const [text, setText] = React.useState(LOAD_TEXT);

  React.useEffect(() => {
    const dotInterval = setInterval(() => {
      setText(prev => prev + '.');
    }, 400);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 60rem;
  border-radius: 20px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.6rem;
  }
`;
