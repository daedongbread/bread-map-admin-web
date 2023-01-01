import { useQuery } from 'react-query';
import { getMenuCount } from './menu';

const useMenuCount = () => {
  const queryKey = ['menuCount'];
  const { data, isLoading, isFetching, isError, refetch } = useQuery(queryKey, () => getMenuCount(), {
    staleTime: 30 * 1000,
  });
  return {
    data,
    loading: isLoading,
    fetching: isFetching,
    error: isError,
    refetch,
  };
};

export { useMenuCount };
