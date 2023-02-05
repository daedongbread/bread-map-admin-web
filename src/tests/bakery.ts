export const fakeBakeries = [
  {
    bakeryId: 3,
    name: '테스트 성수점',
    createdAt: '2023-01-15',
    modifiedAt: '2023-01-16',
    status: 'UNPOSTING',
  },
  {
    bakeryId: 2,
    name: '빵빵 강남점',
    createdAt: '2023-01-15',
    modifiedAt: '2023-01-15',
    status: 'POSTING',
  },
  {
    bakeryId: 1,
    name: '일산 브레드',
    createdAt: '2023-01-15',
    modifiedAt: '2023-01-15',
    status: 'UNPOSTING',
  },
];

// TODO: 테스트용 데이터 추가 필요
export class FakeBakeryClient {
  getItem() {
    return {};
  }

  createItem() {
    return {};
  }

  updateItem() {
    return {};
  }

  getList() {
    return {};
  }

  searchList() {
    return {};
  }
}
