# React Query
## 1. React Qeruy ?
- 데이터 Fectching, 캐싱, 동기화, 서버 데이터 업데이트 등을 쉽게 만들어주는 react 라이브러리
- react 컴포넌트 내부에서 간단하게 API 사용 가능
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