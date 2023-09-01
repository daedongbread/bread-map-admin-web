export const getMonday = (date: Date): string => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));

  const dayNumber = monday.getDate();
  const monthNumber = monday.getMonth() + 1;
  const year = monday.getFullYear();

  return `${year}-${monthNumber < 10 ? '0' + monthNumber : monthNumber}-${dayNumber < 10 ? '0' + dayNumber : dayNumber}`;
};

export type Week = 'PREV' | 'THIS' | 'NEXT';

export const getWeekRange = ({ type, dateStr }: { type: Week; dateStr: string }) => {
  const startMinusDay = type === 'PREV' ? 7 : type === 'THIS' ? 0 : -7;
  const endMinusDay = type === 'PREV' ? 1 : type === 'THIS' ? -6 : -13;
  return {
    start: minusDay(dateStr, startMinusDay),
    end: minusDay(dateStr, endMinusDay),
  };
};

export const minusDay = (baseDate: string, day: number) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() - day);

  const baseYear = date.getFullYear();
  const baseMonth = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const baseDay = date.getDate();

  return `${baseYear}-${baseMonth < 10 ? '0' + baseMonth : baseMonth}-${baseDay < 10 ? '0' + baseDay : baseDay}`;
};

export const dashDateFormat = (baseDate: Date) => {
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const baseDay = baseDate.getDate();
  return `${baseYear}-${baseMonth < 10 ? '0' + baseMonth : baseMonth}-${baseDay < 10 ? '0' + baseDay : baseDay}`;
};

export const getDatesBetween = (start: string, end: string) => {
  const dateArray: string[] = [];
  const currentDate = new Date(start);
  while (currentDate <= new Date(end)) {
    dateArray.push(currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};
