import React from 'react';
import { Route } from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import { StatusCell, Table } from '@/components/Shared';
import { BAKERY_STATUS_OPTIONS, BAKERY_TABLE_HEADERS } from '@/constants';
import { withAllContexts, withRouter, fakeBakeries } from '@/tests';
import { formatTextToOptionObj } from '@/utils/common';

describe('Shared Table', () => {
  it('테이블 컴포넌트가 렌더링된다', () => {
    const component = renderTable();
    expect(component.toJSON()).toMatchSnapshot();
  });

  function renderTable() {
    const fakeBakeryRow = fakeBakeries.map(item => {
      const status = formatTextToOptionObj({ constants: BAKERY_STATUS_OPTIONS, targetText: item.status });
      return {
        ...item,
        status: <StatusCell color={status.color} text={status.text} />,
      };
    });

    return renderer.create(withAllContexts(withRouter(<Route path="/" element={<Table headers={BAKERY_TABLE_HEADERS} rows={fakeBakeryRow} />} />)));
  }
});
