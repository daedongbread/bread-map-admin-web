import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CompleteBakeryInfoUpdateRequestPayload,
  CreateUpdateBakeryPayload,
  DeleteBakeryImagePayload,
  DeleteBakeryInfoUpdateRequestPayload,
  DeleteBakeryMenuReportPayload,
  DeleteBakeryNewReviewPayload,
  GetBakeryAddressPayload,
  GetBakeryImageMenuBarPayload,
  GetBakeryImagePayload,
  GetBakeryInfoUpdateRequestsPayload,
  GetBakeryMenuReportPayload,
  GetBakeryNewReviewsPayload,
  UpdateBakeryMenuReportImagesPayload,
  UpdateBakeryNewReviewExposeStatusPayload,
  UpdateBakeryNewReviewImagesPayload,
  UploadImagePayload,
} from '@/apis';
import { useBakeryApi } from '@/context/bakery';

export const useBakery = ({ bakeryId }: { bakeryId: number }) => {
  const { bakery } = useBakeryApi();
  const queryClient = useQueryClient();

  if (!bakery) {
    throw new Error('bakeryApi를 확인해주세요.');
  }

  const bakeryQuery = useQuery(['bakery', { bakeryId }], () => bakery.getItem({ bakeryId }), {
    enabled: !isNaN(bakeryId),
    onSuccess: () => queryClient.invalidateQueries(['getBakeriesAlarmCount']),
  });

  const addBakery = useMutation((payload: CreateUpdateBakeryPayload) => bakery.createItem(payload), {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });

  const editBakery = useMutation(
    (
      payload: {
        bakeryId: number;
      } & CreateUpdateBakeryPayload
    ) => bakery.updateItem(payload),
    {
      onSuccess: () => {
        return Promise.all([queryClient.invalidateQueries('bakery'), queryClient.invalidateQueries('getBakeries'), queryClient.invalidateQueries('menuCount')]);
      },
    }
  );

  const bakeryReportNewStatusQuery = useQuery(['bakeryReportNewStatus'], () => bakery.getBakeryReportNewStatus({ bakeryId }), {
    enabled: !isNaN(bakeryId),
  });

  const bakeryAddressQuery = ({ address }: GetBakeryAddressPayload) => {
    return useQuery(['bakeryAddress', { address }], () => bakery.searchAddress({ address }), {
      enabled: !!address,
    });
  };

  const bakeryImagesQuery = ({ bakeryId, imageType, page }: GetBakeryImagePayload) => {
    return useQuery(
      ['getBakeryImages', { bakeryId, imageType, page }],
      () =>
        bakery.getImages({
          bakeryId,
          imageType,
          page,
        }),
      {
        enabled: !isNaN(page),
      }
    );
  };

  const uploadImage = useMutation((payload: UploadImagePayload) => bakery.uploadImage(payload));

  const deleteImage = useMutation((payload: DeleteBakeryImagePayload) => bakery.deleteImage(payload), {
    onSuccess: (data, variables) =>
      queryClient.invalidateQueries([
        'getBakeryImages',
        {
          bakeryId: variables.bakeryId,
          imageType: variables.imageType,
        },
      ]),
  });

  const bakeryMenuReportsQuery = ({ bakeryId, page }: GetBakeryMenuReportPayload) => {
    return useQuery(
      ['getBakeryMenuReports', { bakeryId, page }],
      () =>
        bakery.getMenuReports({
          bakeryId,
          page,
        }),
      {
        enabled: !isNaN(page),
      }
    );
  };

  const updateMenuReportImages = useMutation((payload: UpdateBakeryMenuReportImagesPayload) => bakery.updateMenuReportImages(payload), {
    onSuccess: () => Promise.all([queryClient.invalidateQueries('getBakeryImages'), queryClient.invalidateQueries('getBakeryMenuReports')]),
  });

  const deleteMenuReport = useMutation((payload: DeleteBakeryMenuReportPayload) => bakery.deleteMenuReport(payload), {
    onSuccess: () => Promise.all([queryClient.invalidateQueries('getBakeryImages'), queryClient.invalidateQueries('getBakeryMenuReports')]),
  });

  const bakeryInfoUpdateRequestsQuery = ({ bakeryId, page }: GetBakeryInfoUpdateRequestsPayload) => {
    return useQuery(
      ['getBakeryInfoUpdateRequests', { bakeryId, page }],
      () =>
        bakery.getBakeryInfoUpdateRequests({
          bakeryId,
          page,
        }),
      {
        enabled: !isNaN(page),
      }
    );
  };

  const completeBakeryInfoUpdateRequest = useMutation((payload: CompleteBakeryInfoUpdateRequestPayload) => bakery.completeBakeryInfoUpdateRequest(payload), {
    onSuccess: () => queryClient.invalidateQueries('getBakeryInfoUpdateRequests'),
  });

  const deleteBakeryInfoUpdateRequest = useMutation((payload: DeleteBakeryInfoUpdateRequestPayload) => bakery.deleteBakeryInfoUpdateRequest(payload), {
    onSuccess: () => queryClient.invalidateQueries('getBakeryInfoUpdateRequests'),
  });

  const bakeryNewReviewsQuery = ({ bakeryId, page }: GetBakeryNewReviewsPayload) => {
    return useQuery(
      ['getBakeryNewReviews', { bakeryId, page }],
      () =>
        bakery.getBakeryNewReviewList({
          bakeryId,
          page,
        }),
      {
        enabled: !isNaN(page),
      }
    );
  };

  const updateBakeryNewReviewExposeStatus = useMutation(
    (payload: UpdateBakeryNewReviewExposeStatusPayload) => bakery.updateBakeryNewReviewExposeStatus(payload),
    {
      onSuccess: () => Promise.all([queryClient.invalidateQueries('getBakeryImages'), queryClient.invalidateQueries('getBakeryNewReviews')]),
    }
  );

  const updateBakeryNewReviewImages = useMutation((payload: UpdateBakeryNewReviewImagesPayload) => bakery.updateBakeryNewReviewImages(payload), {
    onSuccess: () => Promise.all([queryClient.invalidateQueries('getBakeryImages'), queryClient.invalidateQueries('getBakeryNewReviews')]),
  });

  const deleteBakeryNewReview = useMutation((payload: DeleteBakeryNewReviewPayload) => bakery.deleteBakeryNewReview(payload), {
    onSuccess: () => queryClient.invalidateQueries('getBakeryNewReviews'),
  });

  const bakeryImageMenuBarQuery = ({ bakeryId }: GetBakeryImageMenuBarPayload) => {
    return useQuery(['getBakeryImageMenuBar', { bakeryId }], () => bakery.getBakeryImageMenuBar({ bakeryId }), {
      enabled: !isNaN(bakeryId),
    });
  };

  return {
    bakeryQuery,
    addBakery,
    editBakery,
    bakeryReportNewStatusQuery,
    bakeryAddressQuery,
    bakeryImagesQuery,
    uploadImage,
    deleteImage,
    bakeryMenuReportsQuery,
    updateMenuReportImages,
    deleteMenuReport,
    bakeryInfoUpdateRequestsQuery,
    completeBakeryInfoUpdateRequest,
    deleteBakeryInfoUpdateRequest,
    bakeryNewReviewsQuery,
    updateBakeryNewReviewExposeStatus,
    updateBakeryNewReviewImages,
    deleteBakeryNewReview,
    bakeryImageMenuBarQuery,
  };
};
