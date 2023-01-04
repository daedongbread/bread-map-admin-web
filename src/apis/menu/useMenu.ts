import { useQuery } from 'react-query';
import { getMenuCount } from './menu';

export const useMenu = () => {
  const menuCountQuery = useQuery(['menuCount'], () => getMenuCount(), {
    staleTime: 30 * 1000,
  });

  return { menuCountQuery };
};
