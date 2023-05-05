import React from 'react';
import { Booking, Delivery, Parking, Pet, Shipping, Wifi } from '@/components/Shared/Icons';
import { BAKERY_FACILITY_VALUE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFacility } from '@/store/slices/bakery';
import { Row, theme } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
};

export const FacilityField = ({ label }: Props) => {
  const dispatch = useAppDispatch();
  const {
    form: { facilityInfoList },
  } = useAppSelector(selector => selector.bakery);

  const onToggleFacility = (facilityValue: string) => {
    dispatch(toggleFacility({ value: facilityValue }));
  };

  return (
    <Row>
      <label>{label}</label>
      <FacilityContainer>
        {BAKERY_FACILITIES.map(f => (
          <Item key={f.value} isSelected={facilityInfoList.includes(f.value)} onClick={() => onToggleFacility(f.value)}>
            <div className="icon">{f.icon}</div>
            <span className="text">{f.name}</span>
          </Item>
        ))}
      </FacilityContainer>
    </Row>
  );
};

export const BAKERY_FACILITIES = [
  {
    name: '주차 가능',
    value: BAKERY_FACILITY_VALUE.Parking,
    icon: <Parking />,
  },
  {
    name: '와이파이',
    value: BAKERY_FACILITY_VALUE.Wifi,
    icon: <Wifi />,
  },
  {
    name: '배달',
    value: BAKERY_FACILITY_VALUE.Delivery,
    icon: <Delivery />,
  },
  {
    name: '반려동물',
    value: BAKERY_FACILITY_VALUE.Pet,
    icon: <Pet />,
  },
  {
    name: '택배',
    value: BAKERY_FACILITY_VALUE.Shipping,
    icon: <Shipping />,
  },
  {
    name: '예약',
    value: BAKERY_FACILITY_VALUE.Booking,
    icon: <Booking />,
  },
];

const FacilityContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-left: 20px;
`;

const Item = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 0 10px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.color.prmary50 : theme.color.gray50)};
  border-radius: 10px;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    path,
    circle {
      fill: ${({ isSelected }) => (isSelected ? theme.color.primary500 : theme.color.gray500)};
    }
  }
  .text {
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ isSelected, theme }) => (isSelected ? theme.color.primary500 : theme.color.gray500)};
    margin-left: 5px;
  }
`;
