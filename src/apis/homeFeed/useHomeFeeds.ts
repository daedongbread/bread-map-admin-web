import { useQuery } from 'react-query';
import { GetHomeFeedsPayload } from '@/apis';
import { useHomeFeedApi } from '@/context/homeFeed';

export const useHomeFeeds = () => {
  const { homeFeed } = useHomeFeedApi();

  if (!homeFeed) {
    throw new Error('homeFeedApi를 확인해주세요.');
  }

  const homeFeedsQuery = (params: GetHomeFeedsPayload) => {
    const { categoryName, createBy, page, createdAt, activated } = params;
    return useQuery(
      [
        'homeFeeds',
        {
          page,
          categoryName,
          createBy,
          createdAt,
          activated,
        },
      ],
      () => homeFeed.getList(params),
      {
        enabled: !isNaN(page),
      }
    );
  };

  return {
    homeFeedsQuery,
  };
};
