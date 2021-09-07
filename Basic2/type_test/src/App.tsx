import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';

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

  const movies: { id: number, title: string, year: number }[] = [
    { id:1, title: 'movie1', year: 2018 },
    { id:2, title: 'movie2', year: 2019 },
    { id:3, title: 'movie3', year: 2020 },
    { id:4, title: 'movie4', year: 2021 },
  ];
  const renderMovies: JSX.Element[] = movies.map(movie => {
    return (
      <MovieCard key={ movie['id'] } title={ movie['title'] } year={ movie['year'] } />
    );
  });

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
      { renderMovies }
    </div>
  );
}

interface MovieProps {
  title:string;
  year:number;
}

function MovieCard(props: MovieProps) {
  return (
    <div className="movie">
      <div className="movie-title">{ props['title'] }</div>
      <div className="movie-year">{ props['year'] }</div>
    </div>
  );
};