import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AddHomeCommunityEntity, GetHomeCommunitiesPayload, HomeCommunityEntity, UploadImagePayload } from '@/apis';
import { useHomeCommunityApi } from '@/context/homeCommunity';

export const useHomeCommunity = ({ communityId }: { communityId: number }) => {
  const { homeCommunity } = useHomeCommunityApi();
  const queryClient = useQueryClient();

  if (!homeCommunity) {
    throw new Error('homeCommunityApi를 확인해주세요.');
  }
  const getHomeCommunityEvents = (params: GetHomeCommunitiesPayload) => {
    const { page } = params;
    return useQuery(['homeCommunities', { page }], () => homeCommunity.getList(params), {
      enabled: !isNaN(page),
    });
  };

  const getHomeCommunityEvent = useQuery(['homeCommunity', { communityId }], () => homeCommunity.get({ communityId }), {
    enabled: !isNaN(communityId) && communityId > 0,
  });

  const createHomeCommunityEvent = useMutation((payload: AddHomeCommunityEntity) => homeCommunity.create(payload), {
    onSuccess: () => queryClient.invalidateQueries('homeCommunities'),
  });

  const updateHomeCommunityEvent = useMutation((payload: HomeCommunityEntity) => homeCommunity.update(payload), {
    onSuccess: () => Promise.all([queryClient.invalidateQueries('homeCommunities'), queryClient.invalidateQueries('homeCommunity')]),
  });

  const uploadImage = useMutation((payload: UploadImagePayload) => homeCommunity.uploadImage(payload));

  const canFix = useQuery(['canFix', {}], () => homeCommunity.canFix(), {
    enabled: true,
  });

  return {
    getHomeCommunityEvents,
    getHomeCommunityEvent,
    createHomeCommunityEvent,
    updateHomeCommunityEvent,
    uploadImage,
    canFix,
  };
};
