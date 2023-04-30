import React from 'react';
import CheckSqure from '@/components/Shared/Icons/CheckSqure.svg';
import CheckSqureOrange from '@/components/Shared/Icons/CheckSqureOrange.svg';
import { BAKERY_FILTER } from '@/constants';
import styled from '@emotion/styled';

type Props = {
  currFilterValue: string[];
  onChangeFilter: (filter: { name: string; value: string }) => void;
};

export const BakeryFilter = ({ currFilterValue, onChangeFilter }: Props) => {
  return (
    <Container>
      <div className="grid">
        {BAKERY_FILTER.map((filter, idx) => (
          <FilterItem isOdd={(idx + 1) % 2 === 0}>
            <input type="checkbox" id={filter.value} checked={currFilterValue.includes(filter.value)} onChange={() => onChangeFilter(filter)} />
            <label htmlFor={filter.value}>{filter.name}</label>
          </FilterItem>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 16px;
  margin-left: 13px;
  // width: 43rem;
  .grid {
    display: flex;
    width: 210px;
    flex-wrap: wrap;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FilterItem = styled.div<{ isOdd: boolean }>`
  position: relative;
  height: 25px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    padding-left: ${({ isOdd }) => (isOdd ? '8px' : 0)};
    font-size: 1.35rem;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label:before {
    content: '';
    position: absolute;
    right: 1rem; // -2.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${CheckSqure});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:before {
    opacity: 0;
  }

  input[type='checkbox'] + label:after {
    content: '';
    position: absolute;
    left: 6.5rem; // -2.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${CheckSqureOrange});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;
