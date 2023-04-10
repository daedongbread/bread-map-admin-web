import { BakeryForm } from '@/store/slices/bakery';

export type BakeryStatus = 'POSTING' | 'UNPOSTING';

export type BakerySns = 'websiteURL' | 'instagramURL' | 'facebookURL' | 'blogURL';

/**
 * 빵집 관리
 * 1. 빵집 조회 (GetBakeriesPayload, BakeriesItemEntity, GetBakeriesResponse)
 * 2. 빵집 상세 조회 (BakeryDetailBaseEntity, BakeryDetailEntity, BakeryMenuEntity)
 * 3. 빵집 제보 데이터 -- 대표/메뉴/리뷰이미지, 메뉴제보, 정보수정 -- 신규 등록 여부 조회 (GetBakeryReportNewStatusEntity)
 */
export type GetBakeriesPayload = {
  name: string | null;
  page: number;
};

export type BakeriesItemEntity = {
  bakeryId: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  status: BakeryStatus;
};

export type GetBakeriesResponse = {
  contents: BakeriesItemEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type CreateUpdateBakeryPayload = {
  payload: BakeryForm;
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

export type GetBakeryReportNewStatusEntity = {
  adminImageIsNew: boolean;
  productAddReportIsNew: boolean;
  bakeryUpdateReportIsNew: boolean;
};

/**
 * 빵집 대표/메뉴 이미지
 * 1. 빵집 관련 이미지 조회 (BakeryImageType, GetBakeryImagePayload, BakeryImageEntity, GetBakeryImageResponse)
 * 2. 임시 이미지 업로드 (UploadImagePayload)
 * 3. 빵집 관련 이미지 삭제 (DeleteBakeryImagePayload)
 * 4. 이미지 메뉴바 갯수 조회 (GetBakeryImageMenuBarPayload, GetBakeryImageMenuBarResponse)
 */
export enum BakeryImageType {
  /** 대표 이미지 */
  BakeryReportImage = 'bakeryReportImage',
  /** 제보 이미지 */
  ProductAddReportImage = 'productAddReportImage',
  /** 리뷰 이미지 */
  ReviewImage = 'reviewImage',
}

export type GetBakeryImagePayload = {
  bakeryId: number;
  imageType: BakeryImageType;
  page: number;
};

export type BakeryImageEntity = {
  imageId: number;
  image: string;
  isNew: boolean;
};

export type GetBakeryImageResponse = {
  contents: BakeryImageEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type UploadImagePayload = {
  payload: FormData;
};

export type UploadImageResponse = {
  imagePath: string;
};

export type DeleteBakeryImagePayload = {
  bakeryId: number;
  imageType: BakeryImageType;
  imageId: number;
};

export type GetBakeryImageMenuBarPayload = {
  bakeryId: number;
};

export type GetBakeryImageMenuBarResponse = {
  bakeryReportImageNum: number;
  productAddReportImageNum: number;
  reviewImageNum: number;
};

/**
 * 빵집 메뉴 제보
 * 1. 빵집 메뉴 제보 리스트 조회 (GetBakeryMenuReportPayload, BakeryMenuReportImageEntity, BakeryMenuReportItemEntity, GetBakeryMenuReportsResponse)
 * 2. 빵집 메뉴 제보 사진추가 반영 (UpdateBakeryMenuReportImagesPayload)
 * 3. 빵집 메뉴 제보 삭제 (DeleteBakeryMenuReportPayload)
 */
export type GetBakeryMenuReportPayload = {
  bakeryId: number;
  page: number;
};

export type BakeryMenuReportImageEntity = {
  imageId: number;
  image: string;
  isRegistered: boolean;
};

export type BakeryMenuReportItemEntity = {
  reportId: number;
  createdAt: string;
  name: string;
  price: string;
  nickName: string;
  imageList: BakeryMenuReportImageEntity[];
};

export type GetBakeryMenuReportsResponse = {
  contents: BakeryMenuReportItemEntity[];
  pageNumber: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type UpdateBakeryMenuReportImagesPayload = {
  bakeryId: number;
  reportId: number;
  imageIdList: number[];
};

export type DeleteBakeryMenuReportPayload = {
  bakeryId: number;
  reportId: number;
};

/**
 * 빵집 메뉴 정보수정 제보
 * 1. 빵집 메뉴 정보수정 제보 리스트 조회 (GetBakeryInfoUpdateRequestsPayload, BakeryInfoUpdateRequestEntity, GetBakeryInfoUpdateRequestsResponse)
 * 2. 빵집 메뉴 정보수정 제보 반영 (CompleteBakeryInfoUpdateRequestPayload)
 * 3. 빵집 메뉴 정보수정 제보 삭제 (DeleteBakeryInfoUpdateRequestPayload)
 */
export type GetBakeryInfoUpdateRequestsPayload = {
  bakeryId: number;
  page: number;
};

export type BakeryInfoUpdateRequestEntity = {
  reportId: number;
  createdAt: string;
  nickName: string;
  reason: string;
  content: string;
  imageList: string[];
  isChange: boolean;
};

export type GetBakeryInfoUpdateRequestsResponse = {
  contents: BakeryInfoUpdateRequestEntity[];
  pageNumber: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type CompleteBakeryInfoUpdateRequestPayload = {
  bakeryId: number;
  reportId: number;
};

export type DeleteBakeryInfoUpdateRequestPayload = {
  bakeryId: number;
  reportId: number;
};

export interface BakeryApiClient {
  getItem: ({ bakeryId }: { bakeryId: number }) => Promise<BakeryDetailEntity>;
  createItem: ({ payload }: CreateUpdateBakeryPayload) => void;
  updateItem: ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => void;
  getList: ({ page }: Omit<GetBakeriesPayload, 'name'>) => Promise<{
    bakeries: BakeriesItemEntity[];
    totalCount: number;
    totalPages: number;
  }>;
  searchList: ({ name, page }: GetBakeriesPayload) => Promise<{
    bakeries: BakeriesItemEntity[];
    totalCount: number;
    totalPages: number;
  }>;
  getBakeryReportNewStatus: ({ bakeryId }: { bakeryId: number }) => Promise<GetBakeryReportNewStatusEntity>;
  getImageList: ({ bakeryId, imageType, page }: GetBakeryImagePayload) => Promise<{
    images: BakeryImageEntity[];
    totalCount: number;
    totalPages: number;
  }>;
  uploadImage: ({ payload }: UploadImagePayload) => Promise<{ imagePath: string }>;
  deleteImage: ({ bakeryId, imageType, imageId }: DeleteBakeryImagePayload) => void;
  getBakeryMenuReportList: ({ bakeryId, page }: GetBakeryMenuReportPayload) => Promise<{
    menuReports: BakeryMenuReportItemEntity[];
    totalCount: number;
    totalPages: number;
  }>;
  updateBakeryMenuReportImages: ({ bakeryId, reportId, imageIdList }: UpdateBakeryMenuReportImagesPayload) => void;
  deleteBakeryMenuReport: ({ bakeryId, reportId }: DeleteBakeryMenuReportPayload) => void;
  getBakeryInfoUpdateRequests: ({ bakeryId, page }: GetBakeryInfoUpdateRequestsPayload) => Promise<{
    bakeryInfoUpdateRequests: BakeryInfoUpdateRequestEntity[];
    totalCount: number;
    totalPages: number;
  }>;
  completeBakeryInfoUpdateRequest: ({ bakeryId, reportId }: CompleteBakeryInfoUpdateRequestPayload) => void;
  deleteBakeryInfoUpdateRequest: ({ bakeryId, reportId }: DeleteBakeryInfoUpdateRequestPayload) => void;
  getBakeryImageMenuBar: ({ bakeryId }: GetBakeryImageMenuBarPayload) => Promise<{
    bakeryReportImageNum: number;
    productAddReportImageNum: number;
    reviewImageNum: number;
  }>;
}
