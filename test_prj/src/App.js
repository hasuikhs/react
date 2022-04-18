import { useState, useRef } from 'react';

function App() {

  const [title, setTitle] = useState('');
  const titleRef = useRef(null);

  const submit = () => {
    if (title === '') {
      alert('title 열이 비어있음!');
      titleRef.current.focus();
      return;
    }
    console.log('submit')
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          ref={ titleRef }
          className="form-control"
          placeholder="title을 입력해주세요"
          value={ title }
          onChange={ e => setTitle(e.target.value) }
        />
      </div>
      <button className="btn btn-primary" onClick={ submit }>
        Post
      </button>
    </div>
  );
}

export default App;
