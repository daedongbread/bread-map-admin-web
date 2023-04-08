export const isNumber = (value: number | undefined): boolean => {
  return value !== undefined && value >= 0;
};

export const getNumberFromValue = (value: number | undefined): number => {
  if (isNumber(value)) {
    return Number(value);
  } else {
    throw new Error(`${value}는 number가 아닙니다.`);
  }
};
