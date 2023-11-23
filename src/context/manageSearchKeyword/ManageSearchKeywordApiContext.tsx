import { createContext, useContext } from 'react';
import { ManageSearchKeyword } from 'src/apis/manageSearchKeyword';

export const ManageSearchKeywordApiContext = createContext<{
  manageSearchKeyword: ManageSearchKeyword | null;
}>({ manageSearchKeyword: null });

export const useManageSearchKeywordApi = () => {
  return useContext(ManageSearchKeywordApiContext);
};
