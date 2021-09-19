import React, { useState } from "react";
import MovieForm from "../components/MovieForm";

export default function Movies() {

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
      <MovieCard key={movie['id']} {...movie} removeMovie={removeMovie} />
    );
  }) : '추가된 영화가 없습니다.';

  return (
    <>
      <h1>Movie List</h1>
      <MovieForm addMovie={addMovie} movieId={movies.length} />
      {renderMovies}
    </>
  );
}


function MovieCard({ id, title, year, removeMovie }) {
  return (
    <div className="movie">
      <div className="movie-title">{title}
        <div className="movie-year">({year})</div>
      </div>
      <div>
        <button onClick={() => removeMovie(id)}>삭제</button>
      </div>
    </div>
  );
};