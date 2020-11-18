import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

function Movie({ title, poster }) {
    return (
        <div>
            <MoviePoster poster={poster} />
            <h1>{title}</h1>
        </div>
    )
}

function MoviePoster({ poster }) {
    return (
        <img width="400" src={poster} alt="movie poster" />
    )
}

Movie.prototype = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

MoviePoster.prototype = {
    poster: PropTypes.string.isRequired
}

export default Movie;