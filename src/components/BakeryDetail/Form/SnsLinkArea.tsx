import React from 'react';
import { BakerySns } from '@/apis';
import { Button } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addLink, changeLinkValue, removeLink, selectLinkOption, setLinks, toggleLinkOption } from '@/store/slices/bakery';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import SnsLinkItem from './SnsLinkItem';

export type Option = {
  name: string;
  value: string;
};

export type SnsLink = {
  key: BakerySns;
  value: string;
};

type Props = {
  label: string;
};

export const SnsLinkArea = ({ label }: Props) => {
  const dispatch = useAppDispatch();
  const { formLinks: snsLinks, openedSnsLinkIdx } = useAppSelector(selector => selector.bakery);

  const onToggleLinkOption = (currIdx: number) => {
    dispatch(toggleLinkOption({ currIdx }));
  };

  const onSelectLinkOption = (payload: { currIdx: number; optionValue: string; linkValue: string }) => {
    dispatch(selectLinkOption(payload));
  };

  const onChangeLinkValue = (payload: { currIdx: number; optionValue: string; linkValue: string }) => {
    dispatch(changeLinkValue(payload));
  };

  const onSetLinks = (links: SnsLink[]) => {
    dispatch(setLinks({ links }));
  };

  const onRemoveLink = (currIdx: number) => {
    dispatch(removeLink({ currIdx }));
  };

  const onAddLink = () => {
    dispatch(addLink());
  };

  return (
    <Row>
      <Row alignTop>
        <label>{label}</label>
        <CustomRowContents>
          <>
            {snsLinks.map((link, idx) => (
              <CustomRow key={`link-${idx}`}>
                <SnsLinkItem
                  idx={idx}
                  link={link}
                  opened={openedSnsLinkIdx === idx}
                  options={LINK_OPTIONS}
                  onToggleLinkOption={onToggleLinkOption}
                  onSelectLinkOption={onSelectLinkOption}
                  onChangeLinkValue={onChangeLinkValue}
                  onRemoveLink={onRemoveLink}
                />
              </CustomRow>
            ))}
          </>
          <Row>
            <BtnWrapper>
              <Button type={'lightOrange'} text={'추가하기'} btnSize={'small'} onClickBtn={onAddLink} />
            </BtnWrapper>
          </Row>
        </CustomRowContents>
      </Row>
    </Row>
  );
};

const LINK_OPTIONS: Option[] = [
  { name: '웹사이트', value: 'websiteURL' },
  { name: '인스타그램', value: 'instagramURL' },
  { name: '페이스북', value: 'facebookURL' },
  { name: '기타', value: 'blogURL' },
];

const CustomRowContents = styled(RowContents)`
  input {
    flex: 1;
    margin: 0 5px 0 10px;
  }
`;

const CustomRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  /* * {
    &:not(:last-of-type) {
      margin-right: 10px;
    }
  } */
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 6.4rem;
`;
