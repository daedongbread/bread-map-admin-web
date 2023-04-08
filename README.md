# 대동빵지도 어드민


## 1. 실행 방법
```
1. yarn (install)
2. yarn run dev
```
- 환경변수 파일은 슬랙 or 직접 `jellybrown`에게 물어봐주세요 🙂

## 2. 프로젝트 관리 가이드
- 프로젝트는 현재 dev 환경에서만 개발중입니다. (dev = master 브랜치)

1. 본인 로컬에 클론해주세요.
2. dev branch 에서 feature 를 생성하여 작업을 진행해주세요.
3. 개발 후 feature 를 dev 브랜치로 PR 생성합니다.
4. 자유롭게 코드리뷰, 구조개선 등 말씀해주셔도 됩니다!
5. 배포할 때는 dev 에서 master 브랜치로 PR 생성합니다.

## 3. 라이브러리
### UI
- Emotion

### 상태관리
- Client: Redux Toolkit
- Server: React Query


### 코드 컨벤션
- Eslint (airbnb, 웹 접근성, hooks)
- Prettier [WebStorm 설정 가이드]

### 테스트
- React Testing Library
- Jest


## 4. 프로젝트 구조

```bash
├── apis
│   ├── axios # instance 선언, interceptor 로직 
│   ├── bakery # api 분리
│       ├── bakery.ts # 사용되는 api class 
│       ├── bakeryClient.ts # api class에 주입해서 사용하는 client
│       └── useBakery.ts # Query hooks
│   └── ...
├── components
│   ├── __tests__
│       ├── SharedTable.test.tsx # Shared (공통) 컴포넌트 테스트
│       └── LoginForm.test.tsx # 일반 컴포넌트 테스트
│   ├── Auth # 인증 관련 컴포넌트
│   ├── Shared # 공통 컴포넌트
│   └── ...
├── constants # 상수관리
├── pages # 화면에 해당하는 컴포넌트를 담고있는 컨테이너. 하위폴더는 화면 기준 분리
├── context # 전역/컴포넌트상태 관리가 필요한 경우 사용
├── hooks # Custom hooks 정의
├── routes
│   ├── loader.ts # 라우트 진입 전 실행이 필요한 경우 사용 
│   └── ...
├── store # 현재 bakery form에 대한 상태를 저장하고 있으나, 다른걸로 변경예정
├── styles
│   ├── common # 자주 사용되는 스타일
│   ├── global.tsx # css 초기화 및 기본설정 
│   ├── theme.ts # 프로젝트 테마 색상/크기 등
│   └── ...
├── tests # 테스트시 필요한 mock, function ..
└── utils # 독립적인 함수들 선언
``` 

## 5. 컨벤션

```
일부 컨벤션/방식들은 개선할 예정이고, 의견 환영합니다 🥺
```

### 5-1. Page, Component 구조
- 페이지에 들어가는 최상위 컴포넌트를 pages 에 만듭니다.
```bash
  ├── pages
  │   ├── BakeriesPage.tsx
  │   ├── LoginPage.tsx
  │   └── ...
```


- pages 안에 들어가는 컴포넌트들은 components 안에서 만들고, 불러옵니다.
```tsx
// pages/LoginPage.tsx 

export const LoginPage = () => {
    const navigate = useNavigate();
    const {
        login: { mutate: login, error },
    } = useLogin();

    const { activate: isRemembered, onActive: onActiveRemember, onInactive: onInactiveRemeber, onToggleActive: onToggleRemember } = useToggle();
    const { form, onChangeForm, onSetForm } = useForm<LoginForm>(initialForm);

    useEffect(() => {
 
    // ...
    
return (
    <Container>
        <Wrapper>
            <Logo />
            <LoginForm form={form} onChangeForm={onChangeForm} isRemembered={isRemembered} onToggleRemember={onToggleRemember} />
            <Button type={'orange'} text={'로그인'} onClickBtn={() => onSubmit()} />
        </Wrapper>
    </Container>
)
```

### 5-2. Module Export
- 대부분의 폴더구조는 아래와 같이 폴더가 나뉘어져있고, 폴더마다 index.ts가 있습니다. 
```bash
  ├── Shared
  │   ├── Button
  │       ├── Button.tsx 
  │       └── index.ts
  │   ├── Loading
  │       ├── Loading.tsx
  │       ├── TableLoading.tsx 
  │       └── index.ts
  │   ├── index.ts
  │   └── ...
```

- 이는 모듈을 import할 때 import문의 줄 수를 줄이기 위함입니다.


```tsx
import { Button, Input, Preview, SelectBox, SelectOption } from '@/components/Shared';
```
- 하지않을 경우
```tsx
import { Button } from '@/components/Shared/Button';
import { Input } from '@/components/Shared/Input';
import { Preview } from '@/components/Shared/Preview';
import { SelectBox } from '@/components/Shared/SelectBox';
import { SelectOption } from '@/components/Shared/SelectOption';
```

<br>

1. 컴포넌트, 함수 등등 대부분의 경우, 선언 앞쪽에 export 해줍니다. (Named Export)
```typescript jsx
// ❌ export default BakeriesPage;

export const BakeriesPage = () => {
}
```

2. index.ts에서 모듈을 내보낼 때는 * 로 전체를 내보냅니다.
```typescript
 // ❌ export { SkeletonCell } from './SkeletonCell';

 export * from './SkeletonCell';
```

3. 타입을 export 해줄 경우 export type을 사용해주세요.
```typescript
export type { TableHeader, TableCell, TableProps } from './types';
```

[Named Export, Default Export 참고자료](https://ko.javascript.info/import-export)

### 5-3. API Context

- 실 서비스에 사용되는 api는 Context API를 이용합니다.
- 테스트에 용이하게 DI(Dependency Injection, 의존성 주입)를 이용하여 구현합니다. 
- 사용되는 api, context 폴더의 구조는 다음과 같습니다.

```bash
  ├── api
  │   ├── bakery
  │       ├── bakery.ts
  │       ├── bakeryClient.ts
  │       ├── useBakeries..ts
  │       ├── useBakery.ts
  │       ├── types.ts
  │       └── index.ts
  │   └── ...
```

```bash
  ├── context
  │   ├── bakery
  │       ├── BakeryApiContext.tsx
  │       ├── BakeryApiProvider.tsx
  │       └── index.ts
  │   ├── ...
  │   └── ApiProvider.ts
```


1. client를 주입받을 api class와 client class를 선언합니다.
```typescript
// api/bakery/kbakery.ts

export class Bakery {
  constructor(public client: BakeryApiClient) {}

  async getItem({ bakeryId }: { bakeryId: number }) {
    const item = await this.client.getItem({ bakeryId });
    return item;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    await this.client.createItem({ payload });
  }
```


```typescript
// apis/bakery/bakeryClient.ts

export class BakeryClient implements BakeryApiClient {
  async getItem({ bakeryId }: { bakeryId: number }) {
    const resp = await fetcher.get<BakeryDetailEntity>(`bakery/${bakeryId}`);
    return resp.data;
  }

  async createItem({ payload }: CreateUpdateBakeryPayload) {
    await fetcher.post('bakery', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
```

2. 해당 api의 context와 provider를 만들고, ApiProvider에 추가해줍니다.
```typescript jsx
// context/bakery/BakeryApiContext.tsx

export const BakeryApiContext = createContext<{ bakery: Bakery | null }>({ bakery: null });

export const useBakeryApi = () => {
  return useContext(BakeryApiContext);
};

```

```typescript jsx
// context/bakery/BakeryApiProvider.tsx

const client = new BakeryClient();
const bakery = new Bakery(client);

export const BakeryApiProvider = ({ children }: { children: ReactNode }) => {
  return <BakeryApiContext.Provider value={{ bakery }}>{children}</BakeryApiContext.Provider>;
};

```

```typescript jsx
// context/ApiProvider.tsx

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BakeryApiProvider>
      <BakeryReportApiProvider>{children}</BakeryReportApiProvider>
    </BakeryApiProvider>
  );
};

```

3. React Query를 이용해서 Query hook을 선언할 때 불러와서 사용합니다.
```typescript jsx
// apis/bakery/useBakery.ts

export const useBakery = ({ bakeryId }: { bakeryId: number }) => {
  const { bakery } = useBakeryApi();
  const queryClient = useQueryClient();

  if (!bakery) {
    throw new Error('bakeryApi를 확인해주세요.');
  }

  const bakeryQuery = useQuery(['bakery', { bakeryId }], () => bakery.getItem({ bakeryId }), {
    enabled: !isNaN(bakeryId),
  });

  const addBakery = useMutation(bakery.createItem, {
    onSuccess: () => queryClient.invalidateQueries('getBakeries'),
  });
```
4. 화면에서 api를 이용할 때는 Query hook을 이용합니다.
```typescript jsx
// pages/bakeryDetail/BakeryDetailContainers.tsx

const {
    bakeryQuery: { data: bakery },
    addBakery,
    editBakery,
} = useBakery({ bakeryId: Number(bakeryId) });

// ...

const onCreateForm = (payload: FormData) => {
    addBakery.mutate( 
        // ... 
```



### 5-3. 전달받는 함수를 그대로 사용하지 않고, 추가로 로직을 작성해야하는 경우

- View(화면), ViewComponent(화면 내부 컴포넌트)가 있을 때, 함수들을 내려주고 사용할 때 추가 로직을 어디에 쓸지 헷갈릴 수 있습니다.

```typescript
// MenuEditView.tsx

  const onChangeMenuReportImages = (reportId: number, imageIdList: number[]) => {
    updateMenuReportImages.mutate({ bakeryId, reportId, imageIdList });
  };

  const onDeleteMenuReport = (reportId: number) => {
    if (window.confirm('메뉴 제보를 삭제하시겠습니까?')) {
      deleteMenuReport.mutate({ bakeryId, reportId });
    }
  };
```

```typescript
// MenuEditView 내부 컴포넌트 (SelectableMenuCard)

  const handleUpdate = () => {
    if (selectedImageIds.length === 0) {
      window.alert('선택된 이미지가 없습니다.');
      return;
    }
    onChangeMenuReportImages(reportId, selectedImageIds);
  };

  const handleDelete = () => {
    onDeleteMenuReport(reportId);
  };
```
- 공통적인 로직은 View 영역에 작성합니다. -> `MenuEditView의 onDeleteMenuReport` (무조건 삭제할건지 한번 확인)
- 개별 아이템에서 확인이 필요한 경우, 내부 컴포넌트에서 작성합니다. -> `SelectableMenuCard의 handleUpdate` (selectedImgs가 있는지 확인하는중)

## 6. 테스트

### 6-1. 테스트 실행 방법
```json
{
  "test": "jest --watchAll",
  "test:coverage": "jest --coverage --watchAll"
}
```

### 6-2. 작성중..



