# React Query
## 1. React Qeruy ?
- 데이터 Fectching, 캐싱, 동기화, 서버 데이터 업데이트 등을 쉽게 만들어주는 react 라이브러리
- react 컴포넌트 내부에서 간단하게 API 사용 가능
- 특징
  - **Query**
    - 데이터를 가져오는데 사용되는 함수
    - API 호출을 추상화하고, 데이터를 캐시하며, 상태 및 에러 관리 처리
  - **Mutation**
    - 데이터를 변경 또는 작성하는데 사용되는 함수
    - POST, PUT, DELETE, 등의 HTTP 요청을 보내고, 경과를 처리하고, 캐시를 업데이트
  - **Query 캐싱**
    - React Query는 API 호출의 결과를 자동으로캐시하여 로컬에서 데이터를 저장하고 관리
    - 이를 통해 성능을 최적화하고 중복된 요청을 피할 수 있음
  - **쿼리 키**
    - 캐싱된 데이터를 구별하기 ㅜ이해 사용되는 고유 식별자
    - 쿼리 키는 API 엔드포인트와 파라미터의 조합으로 구성
  - **React Query 컴포넌트**
    - React Query는 React 컴포넌트를 제공하여 데이터 호출 및 상태 업데이트를 관리
    - `<Query>`와 `<Mutation>` 컴포넌트를 사용하여 데이터를 가져오고, 변경하고, 캐싱 가능
  - **React Query Hooks**
    - React Query는 훅 형태로 제공되며, `useQuery`, `useMutation` 등 의 훅을 사용하여 데이테를 가져오고, 변경하고, 관리 가능
- 장점
  - 캐싱
  - get한 데이터를 update하면 자동으로 다시 get을 수행
  - 데이터가 오래되었다면 다시 get을 수행
  - 동일 데이터를 여러번 요청하면 한번만 요청(옵션으로 중복 호출 허용 시간 조절 가능)
  - 무한 스크롤
  - 비동기 과정을 선언적으로 관리
  - react hook과 사용 구조 비슷

## 2. 사용법
### 2.1 설치
```bash
$ npm i @tanstack/react-query @tanstack/react-query-devtools

or 

$ yarn add @tanstack/react-query @tanstack/react-query-devtools
```

### 2.2 사용
- 먼저 가장 기본이 되는 `index.js` NextJS의 경우 `_app.tsx`에 아래와 같이 코딩
  ```javascript
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const queryClient = new QueryClient();

  function App({ Component, pageProps }) {
    return (
      <QueryClientProvider client={ queryClient }>
        <ReactQueryDevtools initialIsOpen={ true } />
        <Component { ...pageProps } />
      </QueryClientProvider>
    );
  }
  ```
#### 2.2.1 useQuery
- 데이터를 get하기 위한 api
- 첫번째 파라미터로 queryKey 값이 들어가고
  - key는 다른 컴포넌트에서도 사용하면 호출 가능
  - 단순하게 문자열로 사용 가능하나 배열의 형태로도 사용 가능
  ```javascript
  const res = useQuery('string', queryFn);

  const res = useQuery(['string1', 'string2'], queryFn);
  ```
  - React Quqery가 query 캐싱을 관리 가능하게 도와줌
    - 동일한 queryKey를 사용하여 서버에 조회한다면, 요청이 여러개 발생하는 것이 아닌 1개의 요청만 일어남
    - queryFn이 다르게 정의되었더라도 같은 결과를 전달 받음
- 두번째 파라미터로 비동기 함수 queryFn (promise)
- return 값은 api의 성공, 실패, api return 값을  포함한 객체
- `useQuery`는 **비동기**로 작동하므로, 한 컴포넌트 내에 여러개의 `useQuery`가 존재한다면 동시에 실행됨
  - 여러개의 비동기 쿼리를 사용한다면 `useQueris`를 추천
