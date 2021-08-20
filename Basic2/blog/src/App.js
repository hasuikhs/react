import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [title, setTitle] = useState(['test1', 'test2', 'test3']);
  let [likeCnt, setLikeCnt] = useState(0);

  function changeTitle() {
    let newArr = [...title];  // array deep copy
    newArr.sort().reverse();

    setTitle( newArr );
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ { color: 'beige', fontSize: '30px' } }>Test Blog</div>
      </div>
      <button onClick={ changeTitle }>button</button>
      <div className="list">
        <h4>{ title[0] } <span onClick={ () => { setLikeCnt(++likeCnt) } }>👍</span> { likeCnt } </h4>  
        <p>8월 20일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h4>{ title[1] }</h4>
        <p>8월 20일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h4>{ title[2] }</h4>
        <p>8월 20일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;
