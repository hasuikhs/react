import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Movie from './Movie';

const movieTitles = [
  'spring',
  'summer',
  'autumn',
  'winter'
];

const movieImages = [
  'https://img.khan.co.kr/news/2020/04/11/2020041001001383400107401.jpg',
  'https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/57/2019/06/17094434/photo-1507525428034-b723cf961d3e.jpg',
  'https://www.greentrust.or.kr/wp-content/uploads/2017/10/fall-1072821_1280-1024x682.jpg',
  'https://img.hankyung.com/photo/202001/99.21354244.1.jpg'
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movie title={movieTitles[0]} image={movieImages[0]} />
        <Movie title={movieTitles[1]} image={movieImages[1]} />
        <Movie title={movieTitles[2]} image={movieImages[2]} />
        <Movie title={movieTitles[3]} image={movieImages[3]} />
      </div>
    );
  }
}

export default App;
