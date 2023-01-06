import React from 'react';
import baguette from '/images/baguette.png';
import styled from '@emotion/styled';

export const Error = ({ errMsg, explanation }: { errMsg: string; explanation?: string }) => {
  return (
    <Container>
      <ImgContainer />
      <ErrorMsg>
        <h2>{errMsg}</h2>
        {explanation && <p>{explanation}</p>}
      </ErrorMsg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const ImgContainer = styled.div`
  width: 30rem;
  height: 20rem;
  background-image: url('${baguette}');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  img {
    width: 100%;
  }
`;

const ErrorMsg = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    font-weight: bold;
    font-size: 1.7rem;
    color: ${({ theme }) => theme.color.gray500};
  }
  p {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.color.gray500};
  }
`;
