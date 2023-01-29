import React from 'react';
import { Route } from 'react-router-dom';
import { StatusCell, Table } from '@/components/Shared';
import { BAKERY_STATUS_OPTIONS, BAKERY_TABLE_HEADERS, PATH } from '@/constants';
import { withAllContexts, withRouter, fakeBakeries, fakeEvent } from '@/tests';
import { formatTextToOptionObj } from '@/utils/common';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Shared Table', () => {
  it('이벤트가 없는 테이블 컴포넌트가 렌더링된다', () => {
    const { asFragment } = renderTable({ haveEvent: false });
    expect(asFragment()).toMatchSnapshot();
  });

  it('이벤트가 있는 테이블 컴포넌트가 렌더링된다', () => {
    const { asFragment } = renderTable({ haveEvent: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('특정 빵집을 누르면 상세페이지로 이동한다', async () => {
    renderTable({ haveEvent: true });

    const target = screen.getAllByTestId('row');
    await userEvent.click(target[0]);
    await waitFor(() => {
      expect(screen.getByText(`상세페이지 베이커리명: ${fakeBakeries[0].name}`)).toBeInTheDocument();
    });
  });

  function renderTable({ haveEvent }: { haveEvent: boolean }) {
    let event = {};
    if (haveEvent) {
      event = fakeEvent;
    }

    const fakeBakeryRow = fakeBakeries.map(item => {
      const status = formatTextToOptionObj({ constants: BAKERY_STATUS_OPTIONS, targetText: item.status });
      return {
        ...item,
        status: <StatusCell color={status.color} text={status.text} />,
      };
    });

    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Table headers={BAKERY_TABLE_HEADERS} rows={fakeBakeryRow} event={event} />} />
            <Route path={`${PATH.Bakeries}/${fakeBakeries[0].bakeryId}`} element={<p>{`상세페이지 베이커리명: ${fakeBakeries[0].name}`}</p>} />
          </>
        )
      )
    );
  }
});
