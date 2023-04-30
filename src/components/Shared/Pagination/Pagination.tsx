import React from 'react';
import { ChevronLeft, ChevronRight } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type PaginationProps = {
  pages: number[];
  currPage: number;
  onClickPage: (page: number) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickEnd: () => void;
  onClickStart: () => void;
};

// usePagination이랑 같이 사용
export const Pagination = ({ pages, currPage, onClickPage, onClickNext, onClickPrev, onClickEnd, onClickStart }: PaginationProps) => {
  return (
    <PaginationContainer>
      <Container>
        <div>
          <Btn onClick={onClickStart} margin>
            <ChevronLeft />
            <ChevronLeft />
          </Btn>
          <Btn onClick={onClickPrev}>
            <ChevronLeft />
          </Btn>
        </div>
        <PagesWrapper currPage={currPage}>
          <ul>
            {pages?.map((p, i) => (
              <Li key={`pageNum-${i}`} active={currPage === p - 1} onClick={() => onClickPage(p - 1)}>
                {p}
              </Li>
            ))}
          </ul>
        </PagesWrapper>
        <div>
          <Btn onClick={onClickNext} margin>
            <ChevronRight />
          </Btn>
          <Btn onClick={onClickEnd}>
            <ChevronRight />
            <ChevronRight />
          </Btn>
        </div>
      </Container>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  height: inherit;
  margin-top: 2rem;
`;

const PagesWrapper = styled.div<{ currPage: number }>`
  height: inherit;

  ul {
    margin: 0 1rem;
    display: flex;
  }
`;

const Li = styled.li<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ theme, active }) => active && theme.color.primary500};
  color: ${({ theme, active }) => active && theme.color.white};
  border-radius: 50%;
  cursor: pointer;
  margin: 0.3rem;
`;

const Btn = styled.button<{ margin?: boolean }>`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 12px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ margin }) => (margin ? '10px' : 0)};
`;
