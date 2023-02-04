import { useQuery } from 'react-query';
import { getMenuCount } from './menu';

export const useMenu = () => {
  const menuCountQuery = useQuery(['menuCount'], () => getMenuCount(), {
    staleTime: 60 * 1000,
  });

  return { menuCountQuery };
};
