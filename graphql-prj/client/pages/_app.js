import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import { ThemeProvider } from 'styled-components';
import { lightTheme, GlobalStyles } from '../style/global';

// 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트, 페이지에 적용할 공통 레이아웃 역할
function App({ Component, pageProps }) {
  const clientRef = useRef(null);

  const getClient = () => {
    if (!clientRef.current) clientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    });

    return clientRef.current;
  }

  return (
    // <ThemeProvider theme={ lightTheme }>
    <QueryClientProvider client={ getClient() } >
      <Hydrate state={ pageProps.dehydratedState }>
        <GlobalStyles />
        <Component { ...pageProps } />
      </Hydrate>
    </QueryClientProvider>
    // </ThemeProvider>
  );
}

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return { pageProps };
};

export default App;