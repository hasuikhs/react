# 4. Component Lifecycle & State

## 4.1 Component Lifecycle - Class
### 4.1.1 Class

<img src="./asset/component_lifecycle.jpeg" width="800">

- Component는 여러 기능들을 정해진 순서대로 실행

- Component 초기 생성시

  - 초기 랜더링 시 필요한 데이터를 끌어오는 로직을 사용할 경우
  - `constructor()`  > `render()` > `componentDidMount()`

  | <center>메서드</center> | <center>설명</center>                                                                 |
  | ----------------------- | ------------------------------------------------------------------------------------- |
  | `constructor()`         | Component 생성, 기본 state 정의 가능, 컴포넌트가 마운트되기 전 호출, 가장 먼저 호 <br> 브라우저의 뒤로 가기 이동시에는 실행되지 않고 `componentDidMount`, `componentDidUpdate` 가 실행 됨                   |
  | `static getDerivedStateFromProps(nextProps, prevProps)` | props로 받아온 것을 state에 넣어주고 싶을 때 사용<br> 다른 메서드와는 다르게 `static`을 필요로 하고, 내부에서 `this` 사용 불가능<br>처음 렌더링 되기 전에도 호출 되고, 리렌더링 되기 전에도 매번 실행됨             |
  | `render()`              | Component 랜더링을 담당, 컴포넌트를 DOM에 마운트하기 위해 호출                        |
  | `componentDidMount()`   | Component 출력물이 DOM에 랜더링(마운트) 된 후 실행, `setTimeout()`나 aJax 호출        |

- Component 업데이트 시

  - props의 변화, state의 변화에 따라 Component 가 업데이트되는 로직이 필요할 경우
  - `static getDerivedStateFromProps()` > `shouldComponentUpdate()` > `render()` > `getSnapshotBeforeUpdate()` > `componentDidMount()`

  | <center>메서드</center>                                 | <center>설명</center>                                        |
  | ------------------------------------------------------- | ------------------------------------------------------------ |
  | `static getDerivedStateFromProps(nextProps, prevProps)` | 위와 같음                                                    |
  | `shouldComponentUpdate(nextProps, nextState)`           | 컴포넌트가 리렌더링 할지 말지를 결정                         |
  | `render()`                                              | Component 랜더링을 담당                                      |
  | `getSnapshotBeforeUpdate(prevProps, prevState)`         | DOM 변화 직전의 실제 DOM 정보를 가져옴, ComponentDidUpdate 전에 실행, 스크롤 위치 등을 저장하는데 유용하게 사용 가능 <br> 16.3 버전에서 추가                       |
  | `componentDidUpdate(prevProps, prevState, snapshot)`    | 이 메서드의 실행 시점에 prop과 state가 바뀜, snapshot 파라미터를 이용해서 이전 prevProps와 prevState 값을 받아와 이용 가능 |

- Component가 DOM에서 제거될 시
  | <center>메서드</center>                                 | <center>설명</center>                                        |
  | ------------------------------------------------------- | ------------------------------------------------------------ |
  | `componentWillUnmount()`                                | 컴포넌트가 마운트 해제되어 제거되기 직전 호출                |


### 4.1.2 Hook
<img src="./asset/hook_lifecycle.png" width="800">

## 4.2 State

- 기존의 코드

  ```javascript
  const movies = [
      {
          title: 'movie 1',
          poster: 'movie poster url 1'
      },
      ...
  ];
      
  class App extends Component {
  	render() {
          return (
          	<div className="App">
              	{movies.map((movie, index) => {
                      <Movie title={movie.title} poster={movie.poster} key={index} />
                  })}
              </div>
          );
      }    
  }
  ```

- state 사용

  ```javascript
  class App extends Component {
      
      state = {
          movies: {
              title: 'movie 1',
          	poster: 'movie poster url 1'
          },
          ...
      };
          
      componentDidMount() {
          setTimeout(() => {
              this.setState({
                  movies: [
                      ...this.state.movies,
                      {
                          title: 'movie 4',
                          poster: 'movie posterurl 4'
                      }
                  ];
              });
          }, 1000);
      }; 
      
    render() {
          return (
          	<div className="App">
              	{this.state.movies.map((movie, index) => {
                      <Movie title={movie.title} poster={movie.poster} key={index} />
                  })}
              </div>
          );
      };    
  }
  ```

  - 이제 더이상 `render()` 함수에서 movies는 찾을 수 없으므로 this.state.movies로 변경
  - `componentDidMount()`를 사용하여 render 후에 일어날 상황 추가

- Loading State

  - 처음부터 데이터가 존재하지 않으므로 처음 스피너나 Loading 문구 등을 넣을 수 있음

  ```javascript
  class App extends Component {
      
      state = {};
  
  	componentDidMount() {
          setTimeout(() => {
              this.setState({
                  movies: [
                      {
                          title: 'Movie 1',
                          poster: 'Movie Posterurl 1'
                      },
                      ...
                  ]
              });
          });
      }
       
      // 사용자 함수
      _renderMovies = () => {
          const movies = this.state.movies.map((movie, index) => {
              return <Movie title={movie.title} poster={movie.poster} key={inex} />
          });
          return movies;
      }
                     
      render() {
          return {
              <div className="App">
                  <!-- state에 movies가 존재하면 render 없으면 Loading -->
              	{this.state.movies ? this._renderMovies() : 'Loading'}
              </div>
          }
      }
  }
  ```
