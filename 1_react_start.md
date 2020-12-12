# 1. React Start

## 1. CRA 사용

- CRA(Create React App) 을 사용하면 configuration을 안해도 되므로 편리

```bash
# npm
$ npm install -g create-react-app

# yarn
$ yarn add global create-react-app
```

### 1.1 프로젝트 생성과 시작

- 프로젝트명은 camelCase 작성 불가능

  ```bash
  $ create-react-app project_name
  ```

- 프로젝트 시작은

  ```bash
  # npm
  $ npm start
  
  # yarn
  $ yarn start
  ```

## 2. CRA 미사용

- 실행 안됨 공부 더 필요...

### 2.1 프로젝트 생성

```bash
$ cd /prj_path/
$ mkdir my_project
$ cd my_project

# npm
$ npm init -y

# yarn
$ yarn init
```

### 2.2 React.js 설치

#### 2.2.1 작업 폴더 생성

- React 작업을 할 src 폴더와 정적 파일, 에셋이 위치할 public 폴더를 생성

- public 폴더에는 React가 App을 render하기 위해 사용할 `index.html` 생성

  ```bash
  $ touch public/index.html
  ```

  - `index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React without CRA</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="../dist/bundle.js"></script>
    </body>
    </html>
    ```

#### 2.2.2 Babel 설치

  - React에서는 ES5/ES6 + JSX를 사용하는데 특정 브라우저에서는 ES6을 지원하지 않기 때문에, **ES6 문법을 ES5로, JSX 문법을 JS로 변환해주는 Babel을 사용**하면 호환성 향상 가능
  - **@babel/core**: Babel 메인 패키지
  - **@babel/preset-env**: ES6+ 코드르 ES5로 변환해주는 라이브러리
  - **@babel/preset-react**: JSX 코드를 JS로 변환해주는 라이브러리

  ```bash
$ npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
  ```

  - 이후, babel에게 설치한 라이브러리를 사용할 것이라고 알려주기 위해 `.babelrc` 설정파일을 만들고 아래와 같이 작성

    ```json
    {
      "presets": ["@babel/env", "@babel/preset-react"]
    }
    ```

#### 2.2.3 Webpack 설치

- Webpack은 웹페이지에서 사용되는 모든 자원들(JS, CSS, 이미지 등)을 번들링해주는 라이브러리
- **webpack**: 웹팩의 코어
- **webpack**-**cli**: 웹팩을 커맨드라인에서 사용
- **webpack-dev-server**: 실시간 개발 서버 환경을 구동할수 있게 해줌
- 웹팩은 **loader**를 사용하여 다른 확장자를 가진 다양한 종류의 파일들을 번들링한다.
  - **style-loader**: 변환된 CSS 파일을 `<style>` 태그로 감싸서 삽입
  - **css-loader**: CSS 파일을 자바스크립트가 이해할 수 있도록 변환
  - **babel-loader**: JSX, ES6+ 문법을 트랜스파일링

```bash
$ npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```

- **html-webpack-plugin:** HTML에 번들링한 JS 파일을 삽입하고, HTML파일을 번들링 된 결과물이 저장될 폴더에 옮겨줌
- **clean-webpack-plugin**: 번들링을 할 때마다 이전 번들링 결과를 제거

- 웹팩의 설정을 담을 webpack.config.js 파일을 만들고 아래의 코드 입력

  ```bash
  $ touch webpack.config.js
  ```

  ```javascript
  const path = require("path");
  const webpack = require("webpack");
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  module.exports = {
  	// entry: 웹팩에게 어플리케이션이 어디서 시작하고 어디서부터 파일들을 묶을건지 시작점을 정해준다. 
    entry: "./src/index.js",
  	// 현재 개발 모드에서 작업 중임을 알려줌. 
    mode: "development",
  // export한 JS 모듈이 어떻게 변환되는지 정의한다. 방법은 rules에 정의한 대로 이루어진다. 
    module: {
      rules: [
  	// 첫번째 룰: ES6, JSX 구문 변환에 대한 것.
        {
          test: /\\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        },
  	// 두번째 룰: CSS 처리에 대한 것. css-loader가 작동하기 위해서는 style-loader가 필요.
        {
          test: /\\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
  // resolve: 웹팩이 해석할 확장자를 지정. 
    resolve: { extensions: ["*", ".js", ".jsx"] },
  // output: 번들링 된 결과물을 어디다 둘 것인지에 대한 설정이 가능.
    output: {
      path: path.resolve(__dirname, "dist/"),
  	// 번들이 생기는 경로를 지정. webpack-dev-server도 이를 참조
      publicPath: "/dist/",
      filename: "bundle.js"
    },
  // webpack-dev-server의 옵션을 설정
    devServer: {
  	// 정적 파일 경로 설정
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
  	// 번들된 코드가 실제로 어디 있는지 서버에게 알려주는 거임
      publicPath: "http://localhost:3000/dist/",
  	// devserver 에서만 핫로딩 가능하게
      hotOnly: true
    },
    plugins: [
  	new webpack.HotModuleReplacementPlugin(),
  	new HtmlWebpackPlugin({
  	// 번들링된 JS를 주입하고 결과물을 옮길 대상이 되는 파일을 지정
        template: './public/index.html',
      }),
  	new CleanWebpackPlugin(),
  ]
  };
  ```

#### 2.2.4 React 설치

- React core 라이브러릿 설치

  ```bash
  $ npm install react react-dom
  ```

- 설치 후, src 폴더 안에 `index.js` 파일을 만들고 아래와 같이 입력

  ```javascript
  import React from "react";
  import ReactDOM from "react-dom";
  import App from "./App.js";
  
  // App 컴포넌트를 root아이디를 가진 DOM에 랜더 (index.html의 id="root")
  ReactDOM.render(<App />, document.getElementById("root"));
  ```

  - React 앱이 어디의 DOM과 연결할지를 알려줌

  - 아직 App Component가 없으므로 src 폴더 안에 App.js 파일 생성

    ```javascript
    import React from "react";
    import "./App.css";
    const App = () => {
      return (
        <div className="App">
          <h1>Hello World!</h1>
        </div>
      )
    }
    export default App;
    ```

  - css 파일도 생성

    ```css
    .App {
      background-color: aquamarine;
    }
    ```

#### 2.2.5 package.json

- scripts 수정

  ```json
  "scripts": {
      "start": "webpack-dev-server --progress --mode development",
      "build": "webpack --progress --mode production"
  }
  ```

  

