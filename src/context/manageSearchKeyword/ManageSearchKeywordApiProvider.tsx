import React, { ReactNode } from 'react';
import { ManageSearchKeyword, ManageSearchKeywordClient } from '@/apis/manageSearchKeyword';
import { ManageSearchKeywordApiContext } from '@/context/manageSearchKeyword/ManageSearchKeywordApiContext';

const client = new ManageSearchKeywordClient();
const manageSearchKeyword = new ManageSearchKeyword(client);

export const ManageSearchKeywordApiProvider = ({ children }: { children: ReactNode }) => {
  return <ManageSearchKeywordApiContext.Provider value={{ manageSearchKeyword }}>{children}</ManageSearchKeywordApiContext.Provider>;
};
