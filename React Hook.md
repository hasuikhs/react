# React Hook

- React 16.8부터 React 요소로 새로 추가

- Hook은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수

## 1. useState

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