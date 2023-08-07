import { useQuery } from 'react-query';
import { GetHomeFeedsPayload } from '@/apis';
import { GetHomeRankingPayload } from '@/apis/homeRanking/types';
import { useHomeFeedApi } from '@/context/homeFeed';
import { useHomeRankingApi } from '@/context/homeRanking';

export const useHomeRanking = () => {
  const { ranking } = useHomeRankingApi();

  if (!ranking) {
    throw new Error('homeFeedApi를 확인해주세요.');
  }

  const homeRankingQuery = ({ startDate }: GetHomeRankingPayload) => {
    return useQuery(['homeRanking', { startDate }], () => ranking.getList({ startDate }), {
      // enabled: !isNaN(page),
    });
  };

  return {
    homeRankingQuery,
  };
};
