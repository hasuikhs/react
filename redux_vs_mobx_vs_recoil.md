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
## 2. Mobx
## 3. Recoil