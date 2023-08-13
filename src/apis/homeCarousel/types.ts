export type GetHomeCarouselResponse = GetHomeCarouselItemResponse[];

export type GetHomeCarouselItemResponse = {
  managerId: number;
  title: string;
  order: number;
  bannerImage: string;
};

export type UpdateHomeCarouselPayload = GetHomeCarouselItemResponse[];

export interface HomeCarouselApiClient {
  getList: () => Promise<GetHomeCarouselResponse>;
  update: (payload: UpdateHomeCarouselPayload) => void;
}
