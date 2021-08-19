import logo from './logo.svg';
import './App.css';

function App() {

  let posts = '테스트 글';

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ { color: 'yellow', fontSize: '30px' } }>Test Blog</div>
      </div>
      <h4>{ posts }</h4>
    </div>
  );
}

export default App;
