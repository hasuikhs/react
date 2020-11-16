import './App.css';
import { Component } from 'react';
import Season from './Season';

class App extends Component {

  state = {
  };

  componentDidMount() {
    // 추후에 click 이벤트로 ajax 추가 가능
    setTimeout(() => {
      this.setState({
        seasons: [
          {
            title: 'spring',
            img: 'https://img.khan.co.kr/news/2020/04/11/2020041001001383400107401.jpg'
          },
          {
            title: 'summer',
            img: 'https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/57/2019/06/17094434/photo-1507525428034-b723cf961d3e.jpg'
          },
          {
            title: 'autumn',
            img: 'https://www.greentrust.or.kr/wp-content/uploads/2017/10/fall-1072821_1280-1024x682.jpg'
          },
          {
            title: 'winter',
            img: 'https://img.hankyung.com/photo/202001/99.21354244.1.jpg'
          },
          {
            title: 'destroy',
            img: 'https://img.huffingtonpost.com/asset/5d8117463b0000c49fd5fbf7.jpeg?ops=1200_630'
          }
        ]
      })
    }, 2000)
  }

  _renderSeasons = () => {
    const seasons = this.state.seasons.map((season, index) => {
      return <Season title={season.title} img={season.img} key={index} />
    })
    return seasons;
  }

  render() {
    return (
      <div className="App">
        {this.state.seasons ? this._renderSeasons() : 'Loading'}
      </div>
    );
  }
}

export default App;
