import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetBakeryReport, useUpdateBakeryReportStatus } from '@/apis';
import { Report } from '@/components/BakeryReportDetail';
import { Button, SelectBox, SelectOption, StatusSelectOption, StatusSelectTrigger } from '@/components/Shared';
import { Header } from '@/components/Shared/Header';
import { BAKERY_REPORT_STATUS_OPTIONS, PATH } from '@/constants';

import useSelectBox from '@/hooks/useSelectBox';
import { extractContentsWithType } from '@/utils';
import styled from '@emotion/styled';

export const BakeryReportDetailContainer = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { bakeryReport, error } = useGetBakeryReport({ reportId: Number(reportId) });
  const { mutate: updateBakeryReportStatus } = useUpdateBakeryReportStatus({
    successFn: async () => {
      await Promise.all([queryClient.invalidateQueries('bakeryReport'), queryClient.invalidateQueries('bakeryReports')]);
      await navigate(PATH.BakeryReports);
    },
  });

  const { isOpen, selectedOption, onToggleSelectBox, onSelectOption } = useSelectBox();

  React.useEffect(() => {
    if (bakeryReport) {
      const currReportStatus = BAKERY_REPORT_STATUS_OPTIONS.find(option => option.value === bakeryReport.status);
      if (!currReportStatus) {
        throw new Error('데이터와 매칭되는 status값이 없습니다.');
      }
      onSelectOption(currReportStatus);
    }
  }, [bakeryReport]);

  const onClickBack = () => {
    navigate(PATH.BakeryReports);
  };

  const onClickAddBakery = () => {
    navigate(`${PATH.Bakeries}/new`);
  };

  const onSaveForm = () => {
    if (!reportId || !selectedOption) {
      return;
    }
    if (!window.confirm('저장하시겠습니까?')) {
      return;
    }

    updateBakeryReportStatus({ reportId: Number(reportId), status: selectedOption.value });
  };

  return (
    <>
      <Header name={'제보관리 > 제보 내용 상세'} />
      <Container>
        <Content>
          <ContentHeader>
            <Button btnSize={'small'} text={'목록 돌아가기'} type={'gray'} onClickBtn={onClickBack} />
            <Wrapper>
              <Button btnSize={'small'} text={'신규등록'} type={'orange'} onClickBtn={onClickAddBakery} />
              <SelectBox
                width={120}
                isOpen={isOpen}
                onToggleSelectBox={onToggleSelectBox}
                triggerComponent={<StatusSelectTrigger selectedOption={selectedOption} />}
              >
                {BAKERY_REPORT_STATUS_OPTIONS.map((option, idx) => (
                  <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectOption} />
                ))}
              </SelectBox>
            </Wrapper>
          </ContentHeader>
          {bakeryReport && <Report contents={extractContentsWithType(bakeryReport)} />}
        </Content>
        <SaveBtns>
          <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onSaveForm} />
        </SaveBtns>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.color.gray50};
  padding: 2rem;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-bottom: 1rem;
    &:first-of-type {
      justify-self: flex-start;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  button {
    margin-right: 1rem;
  }
`;

const SaveBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  padding: 2rem 6rem;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  width: ${({ theme }) => `calc(100% - ${theme.size.sidebarWidth})`};
  background-color: ${({ theme }) => theme.color.white};
  z-index: 2;
  > button {
    width: 18rem;
  }
`;
