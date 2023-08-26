import React from 'react';
import { Input } from '@/components/Shared';
import styled from '@emotion/styled';

type Props = {
  placeholder: string;
  text: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

export const FeedSearchBar = ({ placeholder, text, onChangeText, onSearch }: Props) => {
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Container>
      <Input value={text} onChangeInput={e => onChangeText(e.target.value)} onKeypressInput={onEnter} placeholder={placeholder} type={'plain'} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > input {
    height: 100%;
  }

  button {
    position: absolute;
    top: 43%;
    right: 22px;
    transform: scale(0.7) translateY(-50%);
  }
`;
