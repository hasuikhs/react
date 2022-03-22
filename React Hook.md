# React Hook

- React 16.8부터 React 요소로 새로 추가

- Hook은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수

## 1. useState

```react
const [state, setState] = useState(initialState);
```

- `initialState` 인자는 초기 렌더링 시에 사용하는 state

  - 최초 실행 이후 렌더링 시에는 이 값은 무시됨

  - 초기 state가 리소스가 많이 든다면, 초기 렌더링 시에만 실행될 함수를 대신 넣을 수 있음

    ```react
    const [state, setState] = useState(() => {
      // code 
    });
    ```

```react
import React, { useState } from 'react';

function Button() {
  const [count, setCount] = useState(0);
    
  return (
    <div>
      <p>You clicked {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  );
}
```

- useState Hook이 반환하는 배열의 두번째 원소 값은 상태값 변경 함수
- 리액트는 상태값 변경 함수가 호출되면 해당 컴포넌트를 다시 그리고 하위 자식 컴포넌트도 같이 렌더링됨

- **상태값 변경 함수는 배치로 처리**하기 때문에 상태값을 동시에 두번 호출해도 한번만 처리됨

  - 리액트는 효율적으로 렌더링하기 위해 여러 개의 상태값 변경 요청을 배치로 처리
  - 상태값 변경 함수는 비동기로 동작

  ```react
  function Button() {
  
    const [count, setCount] = useState(0);
  
    function onClick() {
      setCount(count + 1);
      setCount(count + 1);
    }
  
    return (
      <>
        <p>You clicked { count }</p>
        <button onClick={onClick}>
          Click!
        </button>
      </>
    );
  }
  ```

- **상태값 변경 함수에 함수를 입력하면 위의 문제를 해결 가능**

  ```react
  function onClick() {
    setCount(pre => prev + 1);
    setCount(pre => prev + 1);
  }
  ```

  - 상태값 변경 함수로 입력된 함수는 자신이 호출되기 직전의 상태값을 매개변수로 받기에 
  - 첫 번째 호출에서 변경된 상태값이 두 번째 호출의 인수로 사용되므로 위의 코드는 count값이 2만큼 증가됨

- **상태값 변경 함수는 비동기로 처리되지만 순서 보장**

  ```react
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  
  const result = count1 >= count2;
  ```

  - 순서가 보장되어 count1이 먼저 증가하고 count2가 나중에 증가하므로 result는 항상 참(true)

- **useState 하나로 여러 상태값 관리 가능**

  ```react
  const [state, setState] = useState({ name: '', age: 0 });
  
  // ... 이벤트 코드
  onChange={e => setState({ ...state, name: e.target. value })}
  ```

  - useState 훅은 이전 상태값을 덮어쓰기에 ...state와 같은 코드가 필요
  - 상태값들을 하나의 객체로 관리할 때는 useReducer 훅을 사용하는 것이 추천됨

## 2. useEffect

- 함수 실행 시 함수 외부의 상태를 변경하는 연산을 부수 효과라 하는데, 이 효과는 useEffect에서 처리하는게 추천
- useEffect Hook에 입력하는 함수를 부수 효과 함수라 함
  - 이 함수는 렌더링 결과가 **실제 돔에 반영된 후 호출**되고, 컴포넌트가 사라지기 직전에 마지막으로 호출

```react
import React, { useState, useEffect } from 'react';

function Button() {
  const [count, setCount] = useState(0);
    
  useEffect(() => {
    document.title = `클릭수: ${count}`
  });
    
  return (
    <div>
      <p>You clicked {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  );
}
```

- useEffect의 **두번째 매개변수로 배열(의존성 배열)을 입력하면, 배열 안의 값이 변경되는 경우에만 함수가 호출**
  - 두번째 매개변수를 입력하지 않을경우: 렌더링 될때마다 실행
  - 빈배열을 입력할 경우: 최초 한번
  - 배열안에 state 값을 넣을 경우: 해당 state 값이 변경될때마다 실행
- useEffect 안에서 사용하는 상태나, props가 있다면 useEffect의 두번째 매개변수에 넣어주어야하는 것이 규칙
  - 사용하는 값을 넣어주지 않는다면, useEffect 안의 함수가 실행될 때 최신 상태, prop을 가리키지 않음