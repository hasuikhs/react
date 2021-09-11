import React, { useState } from 'react';

export default function MovieForm({ addMovie, movieId }) {
  
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');

  const resetForm = () => {
    setMovieTitle('');
    setMovieYear('');
  };

  const onSubmit = (event) => {
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
    addMovie({
      id: movieId + 1,
      title: movieTitle,
      year: movieYear
    });
    resetForm();
  };

  return (
      <form className="movie-form" onSubmit={ onSubmit }>
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
  )
}