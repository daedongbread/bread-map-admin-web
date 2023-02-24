import React, { ReactNode } from 'react';
import { Button } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  onSaveForm: () => void;
  children: ReactNode;
};

export const Form = ({ onSaveForm, children }: Props) => {
  return (
    <>
      <Forms>
        <div>{children}</div>
      </Forms>
      <SaveBtns>
        <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
        <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
      </SaveBtns>
    </>
  );
};

const Forms = styled.form`
  flex: 1;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  padding: 2rem 6rem;
  margin-bottom: 10rem;
`;

const SaveBtns = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  width: ${({ theme }) => `calc(100% - ${theme.size.sidebarWidth})`};
  background-color: ${({ theme }) => theme.color.white};
  z-index: 2;
  > button {
    width: 18rem;
  }
`;
