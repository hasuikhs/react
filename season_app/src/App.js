import './App.css';
import { Component } from 'react';
import Movie from './Movie';

class App extends Component {

  state = {
  };

  componentDidMount() {
    const headers = new Headers({
      'Access-Control-Allow-Origin' : '*'
    });

    fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count', { headers })
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index} />
    })
    return movies;
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
