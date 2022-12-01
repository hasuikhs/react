import { ThemeProvider } from 'styled-components';
import { lightTheme, GlobalStyles } from '../style/theme.config';

// 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트, 페이지에 적용할 공통 레이아웃 역할
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ lightTheme }>
      <GlobalStyles />
      <Component { ...pageProps } />
    </ThemeProvider>
  );
}

export default MyApp;