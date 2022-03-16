# CSS 작성 방법

> React에서 CSS를 작성하는 방법

## 1. 일반적인 CSS 파일

```css
// Button.css
.big {
    width: 100px;
}
.small {
    width: 50px;
}
.button {
    height: 30px;
    backgroud-color: #AAAAAA;
}
```

```react
import React from 'react';
import './Button.css';

function Button({ size }) {
    if (size === 'big') {
        return <button className="button big">큼</button>;
    } else {
        return <button className="button small">작음</button>;
    }
}

export default Button;
```

## 2. css-module

- css-module을 사용하면 일반적인 css 파일에서 클래스명이 충돌 가능한 단점 극복 가능
  - **스타일에 각 해시값이 포함**되기 때문에 다른 css파일에서 같은 이름의 클래스명을 사용하더라도 충돌하지 않음
- css-module은 간결한 클래스명을 이용해서 컴포넌트 단위로 스타일을 적용할때 좋음

```css
// 위의 css 파일을 Button.module.css로 변경
```

```react
import React from 'react';
import style from './Button.module.css';

function Button({ size }) {
    if (size === 'big') {
        return <button className={`${style.button} ${style.big}`}>큼</button>;
    } else {
        return <button className={`${style.button} ${style.small}`}>작음</button>;
    }
}
```

