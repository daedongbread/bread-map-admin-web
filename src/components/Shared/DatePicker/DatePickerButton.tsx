import React, { forwardRef, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type CustomDatePicker = {
  value: string;
  onClick: () => void;
};

const CustomButton = forwardRef<HTMLButtonElement, CustomDatePicker>(({ value, onClick }, ref) => (
  // value: 07/12/2023
  // TODO: 커스텀  https://doooodle932.tistory.com/150
  <button className="example-custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

export type DatePickerButtonProps = {
  value: Date | null;
  onChangeValue: (v: Date) => void;
};

export const DatePickerButton = ({ value, onChangeValue }: DatePickerButtonProps) => {
  const CustomInput = useMemo(() => <CustomButton value="YYYY.MM.DD" onClick={() => ({})} />, []);

  return (
    <Container>
      <Calendar />
      <DatePicker selected={value} onChange={onChangeValue} customInput={CustomInput} dateFormat={'yyyy-MM-dd'} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0 1.5rem;
  min-width: 231px;
  min-height: 38px;
  color: #9e9e9e;
  font-weight: 700;

  border: ${({ theme }) => `1px solid ${theme.color.gray500}`};
  border-radius: 10px;
`;
