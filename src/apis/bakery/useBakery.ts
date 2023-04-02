import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CompleteBakeryInfoUpdateRequestPayload,
  CreateUpdateBakeryPayload,
  DeleteBakeryInfoUpdateRequestPayload,
  DeleteBakeryMenuReportPayload,
  GetBakeryImagePayload,
  GetBakeryInfoUpdateRequestsPayload,
  GetBakeryMenuReportPayload,
  UpdateBakeryMenuReportImagesPayload,
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
  });

  const addBakery = useMutation((payload: CreateUpdateBakeryPayload) => bakery.createItem(payload), {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });

  const editBakery = useMutation((payload: { bakeryId: number } & CreateUpdateBakeryPayload) => bakery.updateItem(payload), {
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries('bakery'), queryClient.invalidateQueries('getBakeries'), queryClient.invalidateQueries('menuCount')]);
    },
  });

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

  const uploadImage = useMutation((payload: UploadImagePayload) => bakery.uploadImage(payload)); // options

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

  return {
    bakeryQuery,
    addBakery,
    editBakery,
    bakeryImagesQuery,
    uploadImage,
    bakeryMenuReportsQuery,
    updateMenuReportImages,
    deleteMenuReport,
    bakeryInfoUpdateRequestsQuery,
    completeBakeryInfoUpdateRequest,
    deleteBakeryInfoUpdateRequest,
  };
};
