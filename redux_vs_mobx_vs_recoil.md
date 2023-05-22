# Redux vs Mobx vs Recoil
- React에서 상태는 컴포넌트에서 관리되는 동적 정보
- 상태에 따라 컴포넌트들이 렌더링
- React에서 데이터 흐름은 단방향이기에, 부모에서 자식으로 전달은 용이하지만, 자식에서 부모로의 전달은 용이하지 않음
- 또, 부모에서 자식의 자식 컴포넌트로 전달한다면, props drilling 같은 이슈가 생김
- 이를 해결하기 위해 여러 라이브러리가 등장

## 0. Context API
- Context API는 React에서 제공하는 API
- props drilling을 회피 가능
- 하지만, Context API는 Provider로 App을 감싸게 되는데, Context값이 바뀌면 모든 컴포넌트가 리렌더링이 발생
- 컴포넌트가 많아질수록 이 문제는 심각해짐

## 1. Redux
- Redux는 단일 소스의 진리(Single Source of Truth, SSOT) 원칙에 따라 애플리케이션의 상태를 중앙 집중화하고, 상태 변경을 위한 일관된 방법 제공
- 핵심 개념
  - **Store**
    - 애플리케이션의 상태(state)를 담고 있는 객체
    - 애플리케이션의 상태를 변경하기 위해 `dispatch` 메서드 사용 가능
  - **Action**
    - 상태 변경을 위한 정보를 가진 객체
    - 애플리케이션에서 어떤 변화가 발생해야 하는지 나타내며, `type` 필드를 포함
  - **Reducer**
    - 이전 상태와 Action을 받아서 새로운 상태를 반환하는 순수 함수
    - 애플리케이션의 상태 변경 로직이 포함되어 있음
  - **Dispatch**
    - 액션을 발생시키는 메서드
    - 액션을 `dispatch` 메서드로 보내면 Reducer가 호출되어 상태가 변경됨
  - **Subscribe**
    - 상태의 변화를 감지하여 콜백 함수를 호출하는 메서드
    - 상태가 변경될 때마다 콜백 함수가 실행
  - **Container**
    - React 컴포넌트와 Redux 스토어를 연결하는 역할
    - `react-redux` 라이브러리의 `connect` 함수를 사용하여 구현됨
    - 스토어로부터 상태를 가져와 컴포넌트에 전달하고, 필요한 Action을 Dispatch하여 상태 업데이트 가능

- 기본 동작 방식
  1. Action을 Dispatch
  2. Dispatch된 Action은 Reducer에 전달
  3. Reducer는 현재 상태와 Action을 기반으로 새로운 상태를 반환
  4. 변경된 상태는 Store에 저장
  5. Store에 저장된 상태는 `connect`를 통해 연결된 컴포넌트에 전달
  6. 컴포넌트는 변경된 상태를 기반으로 렌더링

- 예시
  ```javascript
  import { createStore } from 'redux';
  import { connect, Provider } from 'react-redux';
  import React from 'react';
  import ReactDOM from 'react-dom';

  // 액션 타입 정의
  const INCREMENT = 'INCREMENT';
  const DECREMENT = 'DECREMENT';

  // 액션 생성자 함수
  const incrementAction = () => {
    return { type: INCREMENT };
  };

  const decrementAction = () => {
    return { type: DECREMENT };
  };

  // 리듀서 함수
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1;
      case DECREMENT:
        return state - 1;
      default:
        return state;
    }
  };

  // 스토어 생성
  const store = createStore(counterReducer);

  // mapStateToProps: 스토어의 상태를 컴포넌트의 props로 매핑
  const mapStateToProps = (state) => {
    return {
      count: state,
    };
  };

  // mapDispatchToProps: 액션을 디스패치하는 함수를 컴포넌트의 props로 매핑
  const mapDispatchToProps = (dispatch) => {
    return {
      increment: () => dispatch(incrementAction()),
      decrement: () => dispatch(decrementAction()),
    };
  };

  // 카운터 컴포넌트
  @connect(mapStateToProps, mapDispatchToProps)
  class Counter extends React.Component {
    render() {
      const { count, increment, decrement } = this.props;

      return (
        <div>
          <h1>카운터: {count}</h1>
          <button onClick={increment}>증가</button>
          <button onClick={decrement}>감소</button>
        </div>
      );
    }
  }


  // 애플리케이션 컴포넌트
  class App extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Counter />
        </Provider>
      );
    }
  }

  // 애플리케이션 렌더링
  ReactDOM.render(<App />, document.getElementById('root'));
  ```

## 2. Mobx
## 3. Recoil