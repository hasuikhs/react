import React, { useState } from 'react';
import InputField from './InputField';

export default function MovieForm({ addMovie, movieId }: { addMovie: Function, movieId: number }): JSX.Element {

  const [movieTitle, setMovieTitle] = useState<string | ''>('');
  const [movieYear, setMovieYear] = useState<string | ''>('');
  const [titleError, setTitleError] = useState<string>('');
  const [yearError, setYearError] = useState<string>('');

  const resetForm = (): void => {
    setMovieTitle('');
    setMovieYear('');
  }

  const validateForm = (): boolean => {
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

  const resetErrors = (): void => {
    setTitleError('');
    setYearError('');
  }

  const onSubmit = (event: any): void => {
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
    <form className="movie-form" onSubmit={onSubmit}>
      <InputField type="text" value={ movieTitle } placeholder={ '영화제목' } onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setMovieTitle(e.target.value) } errorMessage={ titleError } />
      <InputField type="number" value={ movieYear } placeholder={ '개봉년도' } onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setMovieYear(e.target.value) } errorMessage={ yearError } />
      <button className="ml5" type="submit">영화 추가</button>
    </form>
  );
}