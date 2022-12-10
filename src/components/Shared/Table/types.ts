import { Column } from 'react-table';
import { Path } from '@/constants';
export type TableProps = {
  route: Path;
  columns: readonly (Column & { percentage: number })[];
  data: readonly object[];
  rowClickFn?: (id: number) => void;
};

export type TableData<T extends object> = T[];
