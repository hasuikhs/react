# 3. Props

## 1.  기본

```javascript
import Movie from './Movie';

const movieTitles = [
    'movie 1',
    'movie 2',
    'movie 3',
    'movie 4'
];

const moviePosters = [
	'movie poster url 1',
    'movie poster url 2',
    'movie poster url 3',
    'movie poster url 4'
];

class App extends Component {
    render() {
        return (
        	<div className="App">
            	<Movie title= {movieTitles[0]} poster= {moviePosters[0]} />
                <Movie title= {movieTitles[1]} poster= {moviePosters[1]} />
                <Movie title= {movieTitles[2]} poster= {moviePosters[2]} />
                <Movie title= {movieTitles[3]} poster= {moviePosters[3]} />
            </div>
        );
    }
}
```

```javascript
class Movie extends Component {
    render() {
        return (
            <MoviePoster poster={this.props.poster} />
        	<h1>{this.props.title}</h1>
        );
    }
}

class MoviePoster extends Component {
    render() {
        return (
        	<img src={this.props.poster} />
        );
    }
}
```

- 위의 코드를 실행하면 해당 컴포넌트에 들어간 속성값이 담겨서 출력
- **JSX의 경우 명령을 실행시키려면 중괄호는 꼭 써야함**
- **부모 Component에서 자식 Component로 데이터를 쉽게 넘겨주어 Component화(모듈화) 가능 !!**

## 2. 개선

### 2.1 List 데이터 처리

- 특정 API를 쳐서 json 형태의 데이터가 반환될 경우

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

- 기본방법에서 데이터를 일일이 넣는 것이 아니라, map을 사용하여 코드 줄임
- **React는 Element가 많을 경우 key값 입력 필요**

### 2.2 데이터 타입 검증(Validate data type)

- PropTypes 설치

  ```bash
  # npm
  $ npm install --save prop-types
  
  # yarn
  $ yarn add prop-types
  ```

- Movie.js 변경

  ```javascript
  import PropTypes from 'prop-types';
  
  class Movie extends Component {
      
      static propTypes = {
          title: PropTypes.string.isRequired,
          poster: PropTypes.string
      }
  
  	render() {
          ...
      }
  }
  ```

  - 이제 Movie Component에 들어오는 데이터가 어떠한 형태로 들어와야하는지 체크가 가능
  - 필수 속성의 경우 isRequired를 붙여주면 됨