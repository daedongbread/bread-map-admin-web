# 대동빵지도 어드민


## 1. 실행 방법
```
1. yarn (install)
2. yarn run dev
```
- 환경변수 파일은 슬랙 or 직접 `jellybrown`에게 물어봐주세요 🙂

## 2. 프로젝트 관리 가이드
- 프로젝트는 현재 dev 환경에서만 개발중입니다. (dev = master 브랜치)

1. 본인의 깃헙 게정으로 fork
2. 대동빵지도 레포 (upstream) - 본인 레포 (origin) 로 설정한 후 관리해주세요.
3. 개발 후 origin에서 upstream(master)으로 PR을 날립니다.
4. 자유롭게 코드리뷰, 구조개선 등 말씀해주셔도 됩니다!


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
│       ├── bakery.ts # 사용되는 api 
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
├── containers # 화면에 해당하는 컴포넌트를 담고있는 컨테이너. 하위폴더는 화면 기준 분리
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

### 5-1. Presenter Container 구조
- 페이지에 들어가는 최상위 컴포넌트를 Containers 에 만듭니다.
```bash
  ├── container
  │   ├── Bakeries
  │   ├── Login
  │       ├── LoginContainer.tsx # {페이지명칭}Container
  │       └── index.ts # export components
  │   └── ...
```


- container 안에 들어가는 컴포넌트들은 components 안에서 만들고, 불러옵니다.
- 컴포넌트에 들어가는 모든 로직은 container에 작성해줍니다.
```tsx
// containers > LoginContainer.tsx 

export const LoginContainer = () => {
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
);
```

### 5-2. module export
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
// ❌ export default BakeriesContainer;

export const BakeriesContainer = () => {
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

## 6. 테스트

### 6-1. 테스트 실행 방법
```json
{
  "test": "jest --watchAll",
  "test:coverage": "jest --coverage --watchAll"
}
```

### 6-2. 작성중..



