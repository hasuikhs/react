import React, { Component } from 'react';
import './Movie.css';

class Movie extends Component {
    render() { 
        return (
            <div>
                <MoviePoster image={this.props.image} />
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

class MoviePoster extends Component {
    render() {
        console.log(this.props)
        return (
            <img width="400" src={this.props.image}/>
        )
    }
}

export default Movie;