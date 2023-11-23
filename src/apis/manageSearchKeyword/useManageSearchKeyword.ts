import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SearchKeywordCountPayload, UpdateSearchKeywordRankPayload } from '@/apis/manageSearchKeyword/types';
import { useManageSearchKeywordApi } from '@/context/manageSearchKeyword';

export const useManageSearchKeyword = () => {
  const { manageSearchKeyword } = useManageSearchKeywordApi();
  const queryClient = useQueryClient();

  if (!manageSearchKeyword) {
    throw new Error('manageSearchKeywordAPI 를 확인해주세요.');
  }

  const searchKeywordRankingQuery = () => {
    return useQuery(['searchKeywordRanking'], () => manageSearchKeyword.getRanks(), {
      // enabled: !isNaN(page),
    });
  };

  const searchKeywordCountsQuery = ({ sortType }: SearchKeywordCountPayload) => {
    return useQuery(['searchKeywordCounts', sortType], () => manageSearchKeyword.getCounts({ sortType }), {});
  };

  const updateRanks = useMutation((payload: UpdateSearchKeywordRankPayload) => manageSearchKeyword.updateRanks(payload), {
    onSuccess: () => queryClient.invalidateQueries('searchKeywordRanking'),
  });

  return {
    searchKeywordRankingQuery,
    searchKeywordCountsQuery,
    updateRanks,
  };
};
