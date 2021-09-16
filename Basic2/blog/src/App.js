import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import MovieForm from './components/MovieForm';
import Navbar from './components/Navbar';

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

  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies([
      ...movies,
      movie
    ]);
  }

  const removeMovie = (id) => {
    setMovies(movies.filter(item => item['id'] !== id));
  }

  const renderMovies = movies.length ? movies.map(movie => {
    return (
      <MovieCard key={ movie['id'] } { ...movie } removeMovie={ removeMovie }/>
    );
  }) : '추가된 영화가 없습니다.';

  return (
    <div className="App">
      <Navbar />
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
      <MovieForm addMovie={ addMovie } movieId={ movies.length } />
      { renderMovies }
    </div>
  );
}

function MovieCard({ id, title, year, removeMovie }) {
  return (
    <div className="movie">
      <div className="movie-title">{ title }
        <div className="movie-year">({ year })</div>
      </div>
      <div>
        <button onClick={ () =>  removeMovie(id) }>삭제</button>
      </div>
    </div>
  );
};

export default App;
