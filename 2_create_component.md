# 2. Create Component

```html
// index.html

<body>
    <div id="root"></div>
</body>
```

```react
// index.js
import React from 'react';			// react는 라이브러리
import ReactDOM from 'react-dom';	// reactDOM은 웹사이트에 render를 돕는 모델
									// 모바일에 올린다면 reactNative를 사용
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

- ReactDOM이 id="root" 자리에  App을 render
  - ReactDom은 1개의 Component를 render

```react
// App.js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
    reder() {
        return (
        	<div className="App">
            </div>
        );
    }
}

export default App;
```

- 모든 Component는 render function을 가짐
  - render는 해당 Component가 무엇을 보여주는 것이라고 생각