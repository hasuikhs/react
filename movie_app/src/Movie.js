import React, { Component } from 'react';
import './Movie.css';

class Movie extends Component {
    render() { 
        return (
            <div>
                <MoviePoster />
                <h1>hello this is a movie</h1>
            </div>
        )
    }
}

class MoviePoster extends Component {
    render() {
        return (
            <img src="https://upload.wikimedia.org/wikipedia/ko/thumb/1/18/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4.jpg"/>
        )
    }
}

export default Movie;