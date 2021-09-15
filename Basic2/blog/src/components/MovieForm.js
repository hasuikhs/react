import React, { useState } from 'react';
import InputField from './InputFileld';

export default function MovieForm({ addMovie, movieId }) {
  
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [titleError, setTitleError] = useState('');
  const [yearError, setYearError] = useState('');

  const resetForm = () => {
    setMovieTitle('');
    setMovieYear('');
  };

  const validateForm = () => {
    resetErrors();
    let validated = true;

    if (!movieTitle) {
      setTitleError('영화제목을 입력하세요.');
      validated = false;
    }

    if (!movieYear) {
      setYearError('개봉년도를 입력하세요.');
      validated = false;
    }

    return validated;
  }

  const resetErrors = () => {
    setTitleError('');
    setYearError('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      addMovie({
        id: movieId + 1,
        title: movieTitle,
        year: movieYear
      });
      resetErrors();
      resetForm();
    }
  };

  return (
      <form className="movie-form" onSubmit={ onSubmit }>
        <InputField type="text" value={ movieTitle } placeholder={ '영화제목' } onChange={ e => setMovieTitle(e.target.value) } errorMessage={ titleError } />
        <InputField type="number" value={ movieYear } placeholder={ '개봉년도' } onChange={ e => setMovieYear(e.target.value) } errorMessage={ yearError } />
        <button className="ml5" type="submit">영화 추가</button>
      </form> 
  )
}