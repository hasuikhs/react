import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';

interface MovieProps {
  id: number;
  title: string;
  year: string|number;
}

export default function App() {

  const [username, setUsername] = useState<string|''>('');
  const [password, setPassword] = useState<string|''>('');
  const [condition, setCondition] = useState<boolean>(false);
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('submitted');
  };

  const toggle = () => setCondition(!condition);

  // useEffect: 화면에서 이벤트가 발생할때 실행됨
  // 특정 변수의 state만 주시하려면 두번째 인자를 array형태로 넣어줌
  // 빈 array를 넣어주면 최초 한번만(onload 시) 실행됨
  useEffect(() => {
    console.log(username);
  }, [username, password]);

  useEffect(() => {
    console.log('first rendering');
  }, []);

  const renderCondition: string = condition ? 'True' : 'False'

  const [movieTitle, setMovieTitle] = useState<string|''>('');
  const [movieYear, setMovieYear] = useState<string|''>('');
  const [movies, setMovies] = useState<MovieProps[]>([
    { id:1, title: 'movie1', year: 2018 },
    { id:2, title: 'movie2', year: 2019 },
    { id:3, title: 'movie3', year: 2020 },
    { id:4, title: 'movie4', year: 2021 },
  ]);

  const renderMovies: JSX.Element[] = movies.map(movie => {
    return (
      <MovieCard key={ movie['id'] } { ...movie } />
    );
  });

  const addMovie = (event: any) => {
    event.preventDefault();
    if (!movieTitle) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!movieYear) {
      alert('개봉연도를 입력해주세요.');
      return;
    }
    if (isNaN(Number(movieYear))) {
      alert('개봉연도는 숫자여야합니다.');
      return;
    }
    setMovies([
      ...movies,
      {
        id: movies.length + 1,
        title: movieTitle,
        year: movieYear
      }
    ]);
    setMovieTitle('');
    setMovieYear('');
  }

  return (
    <div className="App">
      <form onSubmit={ onSubmit }>
        <input 
          placeholder="Username" 
          value={ username } 
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) }
        /><br/>
        <input 
          // type="password"
          placeholder="Password" 
          value={ password } 
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) }
        /><br/>
        <button type="submit">Submit</button>
      </form>
      <Counter click="Click1"/>
      <Counter click={ username }/>
      <Counter />
      <br/>
      <br/>
      <div>
        { renderCondition }
      </div>
      <button onClick={ toggle }>Toggle</button>
      <h1>Movie List</h1>
      <form className="movie-form" onSubmit={ addMovie }>
        <input
          className="ml5"
          type="text"
          value={ movieTitle }
          placeholder="영화제목"
          onChange={e => setMovieTitle(e.target.value)}
        /><br/>
        <input
          className="ml5"
          type="text"
          value={ movieYear }
          placeholder="개봉연도"
          onChange={e => setMovieYear(e.target.value)}
        />
        <button className="ml5" type="submit">영화 추가</button>
      </form>
      { renderMovies }
    </div>
  );
}

function MovieCard({ title, year }: MovieProps) {
  return (
    <div className="movie">
      <div className="movie-title">{ title }</div>
      <div className="movie-year">{ year }</div>
    </div>
  );
};