import { Route } from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import { Error } from '@/components/Shared';
import { withAllContexts, withRouter } from '@/tests';

describe('Shared Error', () => {
  it('에러 컴포넌트가 렌더링된다', () => {
    const component = renderTable();
    expect(component.toJSON()).toMatchSnapshot();
  });

  function renderTable() {
    return renderer.create(withAllContexts(withRouter(<Route path="/" element={<Error errMsg={'test'} />} />)));
  }
});
