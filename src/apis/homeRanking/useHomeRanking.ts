import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GetHomeRankingPayload, UpdateRankingPayload } from '@/apis/homeRanking/types';
import { useHomeRankingApi } from '@/context/homeRanking';

export const useHomeRanking = () => {
  const { ranking } = useHomeRankingApi();
  const queryClient = useQueryClient();

  if (!ranking) {
    throw new Error('homeFeedApi를 확인해주세요.');
  }

  const homeRankingQuery = ({ startDate }: GetHomeRankingPayload) => {
    return useQuery(['homeRanking', { startDate }], () => ranking.getList({ startDate }), {
      // enabled: !isNaN(page),
    });
  };

  const updateRanking = useMutation((payload: UpdateRankingPayload) => ranking.update(payload), {
    onSuccess: () => queryClient.invalidateQueries('homeRanking'),
  });

  return {
    homeRankingQuery,
    updateRanking,
  };
};
