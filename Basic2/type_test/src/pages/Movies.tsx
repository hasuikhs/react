import { useState } from "react";
import MovieForm from "../components/MovieForm";

interface MovieProps {
  id: number;
  title: string;
  year: string | number;
  removeMovie: Function;
}

export default function Movies(): JSX.Element {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const addMovie = (movie: MovieProps): void => {
    setMovies([
      ...movies,
      movie
    ]);
  }

  const removeMovie = (id: number): void => {
    setMovies(movies.filter((item: MovieProps) => item['id'] !== id));
  }

  const renderMovies: JSX.Element[] | string = movies.length ? movies.map(movie => {
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

function MovieCard({ id, title, year, removeMovie }: MovieProps) {
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