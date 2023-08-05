import { UploadImagePayload } from '@/apis';

export type GetHomeCommunitiesPayload = {
  page: number;
};

export type GetHomeCommunityResponse = {
  contents: HomeCommunityEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type HomeCommunityEntity = {
  managerId?: number;
  nickname?: string;
  userId?: number;
  title: string;
  content: string;
  isFixed: boolean;
  isCarousel: boolean;
  isPosted: boolean;
  bannerImage: string;
  images: string[];
  createdAt?: string;
};

export type AddHomeCommunityEntity = {
  isPosted: boolean;
  isFixed: boolean;
  isCarousel: boolean;
  title: string;
  content: string;
  bannerImage: string;
  images: string[] | null;
};

export type UpdateEventOrderPayload = UpdateEventOrderItem[];

export type UpdateEventOrderItem = {
  order: number;
  managerId: number;
};

export interface HomeCommunityApiClient {
  getList: (params: GetHomeCommunitiesPayload) => Promise<{
    contents: HomeCommunityEntity[];
    totalCount: number;
    totalPages: number;
  }>;
  get: ({ communityId }: { communityId: number }) => Promise<HomeCommunityEntity>;
  create: (payload: AddHomeCommunityEntity) => void;
  update: (payload: HomeCommunityEntity) => void;
  uploadImage: ({ payload }: UploadImagePayload) => Promise<{ imagePath: string }>;
  canFix: () => Promise<boolean>;
}
