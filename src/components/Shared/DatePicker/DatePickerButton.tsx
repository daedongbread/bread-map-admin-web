import React, { forwardRef, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';

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

export const DatePickerButton = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const CustomInput = useMemo(() => <CustomButton value="YYYY.MM.DD" onClick={() => ({})} />, []);

  return <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} customInput={CustomInput} />;
};
