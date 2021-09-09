import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [condition, setCondition] = useState(false);
  
  const onSubmit = (event) => {
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

  const renderCondition = condition ? 'True' : 'False'

  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movies, setMovies] = useState([
    { id:1, title: 'movie1', year: 2018 },
    { id:2, title: 'movie2', year: 2019 },
    { id:3, title: 'movie3', year: 2020 },
    { id:4, title: 'movie4', year: 2021 },
  ]);

  useEffect(() => {

  })

  const renderMovies = movies.map(movie => {
    return (
      <MovieCard key={ movie['id'] } movie={ movie } />
    );
  });

  const addMovie = (event) => {
    event.preventDefault();
    setMovies([
      ...movies, 
      {
        id: movies.length + 1,
        title: movieTitle,
        year: movieYear
      }
    ]);
  };

  return (
    <div className="App">
      <form onSubmit={ onSubmit }>
        <input 
          placeholder="Username" 
          value={ username } 
          onChange={ (e) => setUsername(e.target.value) }
        /><br/>
        <input 
          // type="password"
          placeholder="Password" 
          value={ password } 
          onChange={ (e) => setPassword(e.target.value) }
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
      <form onSubmit={ addMovie }>
        <input
          type="text"
          value={ movieTitle }
          placeholder="영화제목"
          onChange={e => setMovieTitle(e.target.value)}
        /><br/>
        <input
          type="text"
          value={ movieYear }
          placeholder="개봉연도"
          onChange={e => setMovieYear(e.target.value)}
        />
        <button type="submit">영화 추가</button>
      </form> 
      { renderMovies }
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie">
      <div className="movie-title">{ movie['title'] }</div>
      <div className="movie-year">{ movie['year'] }</div>
    </div>
  );
};

export default App;
