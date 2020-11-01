import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Movie from './Movie';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movie />
      </div>
    );
  }
}

export default App;
