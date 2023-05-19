# function bind

## 1. 클래스형
- 하지 않는다면 자식요소에서 상위 메서드의 함수를 실행했을때 상위 컴포넌트의 `this.setState`가 제대로 작동하지 않음
- React에서 자식요소로 함수를 내려줄 때 `bind(this)` 해야하는 이유는 함수의 스코프와 관련 있음
- **스코프 유지**
  - React 컴포넌트의 메서드는 컴포넌트의 인스턴스와 바인딩되어야 함
  - 그렇지 않으면 해당 메서드 내부에서 컴포넌트 인스턴스의 속성이나 상태에 접근 불가능
  - 때문에 **함수를 자식 요소로 전달할 때, 해당 함수가 올바른 컴포넌트 인스턴스와 바인딩되어야 함**
- **성능 최적화**
  - **함수가 자식 요소로 전달할 때마다 새로운 함수 인스턴스가 생성되는 것을 방지하기 위함**
  - React는 변경 감지(change detection)를 수행하여 필요한 경우에만 컴포넌트를 업데이트
    - 함수가 매번 새로운 인스턴스로 생성되면 React는 이전 함수와 새로운 함수를 다른 것으로 간주하고 컴포넌트를 불필요하게 업데이트할 수 있음
    - **`bind`를 사용하면 동일한 함수 인스턴스를 유지하면서 성능 향상 가능**


```javascript
import React, { Component } 'react';

class ParentComponent extends Component {
  constructor(props) {
    super(props);

    // 바인딜할 함수의 이름과 전달하는 함수의 이름이 동일할 필요는 없음
    // 단, 이름을 일치시키는 것은 가독성을 위한 것
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Button clicked!');
  }

  render() {
    return (
      <div>
        <ChildComponent onClick={this.handleClick} />
      </div>
    );
  }
}

function ChildComponent(props) {
  return (
    <button onClick={props.onClick}>Click Me</button>
  );
}
```
  - 화살표 함수
    - `<ChildComonent onClick{ () => this.handleClick() } />`
    - 위와 같이 **화살표 함수는 자체적으로 바인딩을 수행하므로 추가적인 `bind` 작업이 필요하지 않음**
      - 함수형 컴포넌트에서는 this의 사용이 불필요하기 때문
    - 단, 익명 함수는 `render()` 함수가 실행될 때마다 새로 만들어짐
      - `render()` 함수는 변화가 있을 때마다 실행이 되므로, 변화가 잦으면 `render()` 함수가 여러번 실행되게 됨
      - `render()` 함수가 여러번 실행되게 되면 익명 함수도 여러 번 만들어지게 되고, 익명 함수를 만드는 과정은 순수 오버헤드가 됨
      - **즉, 변화가 잦아서 `render()`  함수가 자주 실행되는 경우, 익명 함수를 쓰는 것은 비효율적**
  - `bind`

## 2. 함수형
- 함수형 컴포넌트에서는 `bind`를 사용할 필요가 없음
  - 함수형 컴포넌트에서는 자동으로 바인딩이 이루어지기 때문
  - **함수형 컴포넌트가 자체적으로 함수 컴포넌트 인스턴스를 유지하고 있기 때문**
