import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GetBakeryImagePayload, GetBakeryInfoUpdateRequestsPayload, GetBakeryMenuReportPayload } from '@/apis';
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

  const addBakery = useMutation(bakery.createItem, {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });

  const editBakery = useMutation(bakery.updateItem, {
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

  const uploadImage = useMutation(bakery.uploadImage); // options

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

  const updateMenuReportImages = useMutation(bakery.updateMenuReportImages, {
    onSuccess: () => queryClient.invalidateQueries('getBakeryImages'),
  });

  const deleteMenuReport = useMutation(bakery.deleteMenuReport, {
    onSuccess: () => queryClient.invalidateQueries('getBakeryMenuReports'),
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

  const completeBakeryInfoUpdateRequest = useMutation(bakery.completeBakeryInfoUpdateRequest, {
    onSuccess: () => queryClient.invalidateQueries('getBakeryInfoUpdateRequests'),
  });

  const deleteBakeryInfoUpdateRequest = useMutation(bakery.deleteBakeryInfoUpdateRequest, {
    onSuccess: () => queryClient.invalidateQueries('getBakeryInfoUpdateRequests'),
  });

  return {
    bakeryQuery,
    addBakery,
    editBakery,
    bakeryImagesQuery,
    bakeryMenuReportsQuery,
    updateMenuReportImages,
    deleteMenuReport,
  };
};
