# 3. Props

## 1.  기본

```react
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
            	<Movie title= {movieTitles[0]} />
                <Movie title= {movieTitles[1]} />
                <Movie title= {movieTitles[2]} />
                <Movie title= {movieTitles[3]} />
            </div>
        );
    }
}
```

```react
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