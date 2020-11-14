import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Season from './Season';

const seasons = [
  {
    id: 0,
    title: 'spring',
    img: 'https://img.khan.co.kr/news/2020/04/11/2020041001001383400107401.jpg'
  },
  {
    id: 1,
    title: 'summer',
    img: 'https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/57/2019/06/17094434/photo-1507525428034-b723cf961d3e.jpg'
  },
  {
    id: 2,
    title: 'autumn',
    img: 'https://www.greentrust.or.kr/wp-content/uploads/2017/10/fall-1072821_1280-1024x682.jpg'
  },
  {
    id: 3,
    title: 'winter',
    img: 'https://img.hankyung.com/photo/202001/99.21354244.1.jpg'
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        {seasons.map(season => {
          return <Season title={season.title} img={season.img} key={season.id} />
        })}
      </div>
    );
  }
}

export default App;
