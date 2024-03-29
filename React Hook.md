# React Hook

- React 16.8부터 React 요소로 새로 추가
- Hook은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수
- Hook은 class를 작성하지 않고도 React의 기능들을 사용 가능케 해줌

## 0. 규칙

- **최상위에서만 Hook을 호출**
  - 반복문, 조건문 혹은 중첩된 함수 내에서 Hook 호출 금지
- **오직 React 함수 내에서 Hook을 호출**
  - Hook을 일반적인 JS 함수에서 호출 금지

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

- `useState` Hook이 반환하는 배열의 두번째 원소 값은 상태값 변경 함수
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

- **`useState` 하나로 여러 상태값 관리 가능**

  ```react
  const [state, setState] = useState({ name: '', age: 0 });
  
  // ... 이벤트 코드
  onChange={e => setState({ ...state, name: e.target. value })}
  ```

  - `useState` 훅은 이전 상태값을 덮어쓰기에 ...state와 같은 코드가 필요
  - 상태값들을 하나의 객체로 관리할 때는 `useReducer` 훅을 사용하는 것이 추천됨

## 2. useEffect, useLayoutEffect
- [참고](https://github.com/donavon/hook-flow)
### 2.1 useEffect

- 함수 실행 시 함수 외부의 상태를 변경하는 연산을 부수 효과라 하는데, 이 효과는 `useEffect`에서 처리하는게 추천
- `useEffect` Hook에 입력하는 함수를 부수 효과 함수라 함
  - 이 함수는 렌더링 결과가 **실제 돔에 반영된 후 호출**되고, 컴포넌트가 사라지기 직전에 마지막으로 호출

```javascript
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

- `useEffect`의 **두번째 매개변수로 배열(의존성 배열)을 입력하면, 배열 안의 값이 변경되는 경우에만 함수가 호출**
  - 두번째 매개변수를 입력하지 않을경우: 렌더링 될때마다 실행
  - 빈배열을 입력할 경우: 최초 한번
  - 배열안에 state 값을 넣을 경우: 해당 state 값이 변경될때마다 실행
- `useEffect` 안에서 사용하는 상태나, props가 있다면 `useEffect`의 두번째 매개변수에 넣어주어야하는 것이 규칙
  - 사용하는 값을 넣어주지 않는다면, useEffect 안의 함수가 실행될 때 최신 상태, prop을 가리키지 않음
- `useEffect` 안에서 `return`을 사용하여 컴포넌트가 unmount 될 때 호출되게 할 수 있음
  ```javascript
  useEffect(() => {
    ...
    return () => {
      ...
    }
  })
  ```

### 2.2 useLayoutEffect
- 기본적인 형태는 `useEffect`와 동일
- `useLayoutEffect`는 SSR은 아님
- `useEffect`는 화면이 복잡해지면 렌더링 시간이 증가하게 되면서, `setState`에서 비어있는게 보여 불편한 경험을 제공
- `useLayoutEffect`는 브라우저가 DOM을 그리기 전에 이펙트를 수행
  - 즉, `useEffect`는 DOM이 화면에 그려진 이후 실행, `useLayoutEffect`는 DOM이 화면에 그려지기 전에 실행
- 페인트되기 전에 DOM 조작이 필요할 경우 사용(화면 깜빡임 등)
- `useEffect`와의 차이점은 브라우저 페인팅 전후에 따른 실행 순서의 차이
## 3. useContext

- 기존에 컴포넌트 간에 데이터를 전달하려면 props를 이용해야 했음
  - props는 부모 자식 관계에서 데이터를 전달
  - 즉, A, B, C 컴포넌트가 각각 부모자식 관계일 때, A에서 C로 데이터를 주려면 B를 거쳐야 했음
  - 이 문제를 해결하기 위해서는 보통 Redux를 사용했지만, `useContext`로 대체 가능해짐

```javascript
// App.js
import React, { useState } from 'react';
import Button from './component/button'

const UserContext = createContext('');	// 전역으로 사용할 변수

function App() {
  const [globalName, setGlobalName] = useState('');
    
  return (
  	<>
      <UserContext.Provider value = {globalName}>
      	<Button />
      </UserContext.Provider>
    </>
  );
}

export default App;
export { UserContext };
```

```javascript
// component/button.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';

function Button() {

  const globalName = useContext(UserContext);

  return (
    <p>{`this globalUser name is ${globalName}`}</p>
      
    // ... 
  );
}
```

- 상위 컴포넌트에서 **Provider 컴포넌트**를 이용해서 데이터를 전달
  - 만약 최상위에 도달할 때까지 Provider 컴포넌트를 찾지 못한다면 기본값 사용
- 하위 컴포넌트에서 **Consumer 컴포넌트**를 이용해서 데이터를 사용
  - Provider 컴포넌트의 속성값이 변경되면 하위의 모든 Consumer 컴포넌트는 다시 렌더링 됨
- `useContext` 사용시 주의 사항
  
  - Provider에 제공한 value가 달라지면 `useContext`를 쓰고 있는 **모든 컴포넌트가 리렌더링**
  
    - value 안에는 여러개의 변수가 들어올 수 있는데, 그 중 **하나라도 바뀌면 전체가 리렌더링**됨으로 많은 리소스를 사용하여 렉 유발
    - 자주 바뀌는 것들을 별도의 context로 묶거나, 자식 컴포넌트들을 적절히 분리해야 함
    
## 4. useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- useState의 대체 함수
- 다수의 하위값을 포함하는 복잡한 정적 로직을 만드는 경우, state가 이전 state에 의존적인 경우 사용
- `useState`와 비슷하지만 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리 가능
  - 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우
  - 상태 업데이트 로직을 컴포넌트 바깥에 작성 가능하고, 다른 파일에 작성 후 로드 가능


```javascript
// 초기화 지연
function init(initialCount) {
  return {count: initialCount};
}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}
function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```

## 5. useMemo

```javascript
const memorizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 메모이제이션된 **값을 반환**, 함수 컴포넌트 내부에서 발생하는 **연산 최적화** 가능
- `useMemo`는 의존성이 변경되었을 때에만 다시 계산함
- 하지만 통상적으로 랜더링 중에는 하지 않는 것은 `useMemo`에서 하지 말고, `useEffect`에서 해야함
- 배열이 없는 경우에는 매 랜더링마다 새 값을 계산하게 됨
- `useMemo`는 성능 최적화를 위해 사용 가능하지만, 의미상으로 보장되었다고 생각하지 말 것
  - `useMemo` 함수를 남용하면, 컴포넌트의 복잡도가 올라가기 때문에 코드를 읽기 어려워지고 유지 보수성 저하 가능
  - 재활용을 위해서 **GC에서 제외되기 때문에 메모리를 더 쓸 수 있음**

## 6. useCallback

```javascript
const memorizedCallback = useCallback(() => do(a, b), [a, b]);
```

- `useMemo()`와 비슷하지만 값이 아닌 메모이제이션된 **함수를 반환**
- 컴포넌트가 랜더링될 때마다 매번 함수를 새로 정의하는 것이 아닌 의존성이 변경되었을 때만 함수를 새로 정의하여 반환

```javascript
function Example() {
  // const onClick = event => {
  //   // 클릭 이벤트
  // }
  const onClick = useCallback(() => {
    // 클릭 이벤트
  }, []);

  return (
    <>
      <button onClick={ onClick }>버튼</button>
    </>
  )
}
```