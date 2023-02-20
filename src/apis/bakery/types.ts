export type BakeryStatus = 'POSTING' | 'UNPOSTING';

export type BakerySns = 'websiteURL' | 'instagramURL' | 'facebookURL' | 'blogURL';

export type BakeriesItemEntity = {
  bakeryId: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  status: BakeryStatus;
};

export type BakeryMenuEntity = {
  productId: number;
  productType: string;
  productName: string;
  price: number;
  image: string | null;
};

export type BakeryDetailBaseEntity = {
  name: string;
  image: string | null;
  address: string;
  latitude: number;
  longitude: number;
  hours: string | null;
  websiteURL: string | null;
  instagramURL: string | null;
  facebookURL: string | null;
  blogURL: string | null;
  phoneNumber: string | null;
};

export type BakeryDetailEntity = BakeryDetailBaseEntity & {
  facilityInfoList: string[]; // PARKING...
  productList: BakeryMenuEntity[];
  status: BakeryStatus;
};

export type GetBakeriesPayload = {
  name: string | null;
  page: number;
};

export type CreateUpdateBakeryPayload = {
  payload: FormData;
};

export type GetBakeriesResponse = {
  contents: BakeriesItemEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export interface BakeryApiClient {
  getItem: ({ bakeryId }: { bakeryId: number }) => Promise<BakeryDetailEntity>;
  createItem: ({ payload }: CreateUpdateBakeryPayload) => void;
  updateItem: ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => void;
  getList: ({ page }: Omit<GetBakeriesPayload, 'name'>) => Promise<{ bakeries: BakeriesItemEntity[]; totalCount: number; totalPages: number }>;
  searchList: ({ name, page }: GetBakeriesPayload) => Promise<{ bakeries: BakeriesItemEntity[]; totalCount: number; totalPages: number }>;
}
