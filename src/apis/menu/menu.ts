import { fetcher } from '@/apis/axios';
import { MenuCountEntity } from '@/apis/menu/types';

const getMenuCount = async () => {
  const resp = await fetcher.get<MenuCountEntity>('/bar');
  return resp.data;
};

export { getMenuCount };
