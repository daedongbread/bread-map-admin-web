import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateUpdateCurationFeedPayload } from '@/apis';
import { useHomeFeedApi } from '@/context/homeFeed';

export const useHomeFeed = ({ feedId }: { feedId: number }) => {
  const { homeFeed } = useHomeFeedApi();
  const queryClient = useQueryClient();

  if (!homeFeed) {
    throw new Error('homeFeedApi를 확인해주세요.');
  }

  const homeFeedQuery = useQuery(['homeFeed', { feedId }], () => homeFeed.getItem({ feedId }), {
    enabled: !isNaN(feedId),
    onSuccess: () => queryClient.invalidateQueries(['getBakeriesAlarmCount']),
  });

  const addHomeFeed = useMutation((payload: CreateUpdateCurationFeedPayload) => homeFeed.createItem(payload), {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });

  const editHomeFeed = useMutation((payload: { feedId: number } & CreateUpdateCurationFeedPayload) => homeFeed.updateItem(payload), {
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries('bakery'), queryClient.invalidateQueries('getBakeries'), queryClient.invalidateQueries('menuCount')]);
    },
  });

  return {
    homeFeedQuery,
    addHomeFeed,
    editHomeFeed,
  };
};
