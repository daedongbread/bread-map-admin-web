import React, { useEffect, useState } from 'react';

const PAGING_COUNT = 5; // pagination 컴포넌트의 페이징 갯수
const FIRST_PAGE = 1;

const usePagination = () => {
  const [pages, setPages] = useState<number[]>([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setPages(getPagesFromTarget({ target: currPage, total: totalPage }));
  }, [currPage, totalPage]);

  const getPagesFromTarget = ({ target, total }: { target: number; total: number }) => {
    let startPage: number;
    if (target === FIRST_PAGE - 1) {
      startPage = FIRST_PAGE;
    } else {
      const idx = Math.floor(target / PAGING_COUNT);
      startPage = PAGING_COUNT * idx + 1;
    }

    const pages = [];
    for (let i = 0; i < PAGING_COUNT; i++) {
      if (startPage <= total) {
        pages.push(startPage++);
      } else break;
    }
    return pages;
  };

  const onChangeTotalPageCount = (page: number) => {
    setTotalPage(page);
  };

  const onSetPage = (page: number) => {
    setCurrPage(page);
  };

  const onSetNext = () => {
    if (!totalPage || pages.includes(totalPage)) {
      return;
    }
    setPages(pages => {
      return pages.filter(page => page + PAGING_COUNT <= totalPage).map(page => page + PAGING_COUNT);
    });
  };

  const onSetPrev = () => {
    if (pages.includes(FIRST_PAGE)) {
      return;
    }
    setPages(pages => {
      const p = pages[0];
      const prevPages = Array(PAGING_COUNT)
        .fill(p)
        .map((num, idx) => num + idx - PAGING_COUNT);
      return prevPages;
    });
  };

  const onSetEnd = () => {
    if (!totalPage || pages.includes(totalPage)) {
      return;
    }
    setPages(getPagesFromTarget({ target: totalPage, total: totalPage }));
  };

  const onSetStart = () => {
    if (pages.includes(FIRST_PAGE)) {
      return;
    }
    setPages([1, 2, 3, 4, 5]);
  };

  return {
    pages,
    currPage,
    onChangeTotalPageCount,
    onSetPage,
    onSetNext,
    onSetPrev,
    onSetEnd,
    onSetStart,
  };
};

export default usePagination;
