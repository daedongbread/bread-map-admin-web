import React from 'react';
import styled from '@emotion/styled';

type AlarmChip = {
  color: string;
  bgColor: string;
  text: string;
};

export type Props = {
  alarms: AlarmChip[];
};

export const AlarmCell = ({ alarms }: Props) => {
  return (
    <Container>
      {alarms?.map((alarm, idx) => (
        <Chip key={`${alarm.text}-${idx}-${Math.floor(Math.random() * 1000) + 1}`} color={alarm.color} bgColor={alarm.bgColor}>
          <span>{alarm.text}</span>
        </Chip>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Chip = styled.div<{ color: string; bgColor: string }>`
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  padding: 10px;
  height: 22px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;
